const DB = require("./db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

function selectAll(callback) {
  DB.pool.query("SELECT * FROM users;", (err, result) => {
    callback(err, result);
  });
}

function selectUser(username, callback) {
  DB.pool.query(
    `SELECT * FROM users WHERE login = '${username}';`,
    (err, result) => {
      callback(err, result);
    }
  );
}

function addUser(user, callback) {
  if (user.id == undefined) user.id = null;

  function hashPassword() {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) {
        callback(err);
      } else {
        DB.pool.query(
          `INSERT INTO users(idUser, login, password) values(${user.id}, '${user.username}', '${hash}');`,
          (err, result) => {
            callback(err, result);
          }
        );
      }
    });
  }

  selectUser(user.username, (err, result) => {
    if (result.length > 0) {
      err = {
        code: 1,
        message: "Nom d'utilisateur déjà pris"
      };
      callback(err);
    } else {
      hashPassword();
    }
  });
}

function deleteUser(idUser, callback) {
  DB.pool.query(
    `DELETE FROM users WHERE (idUser = '${idUser}');`,
    (err, result) => {
      callback(err, result);
    }
  );
}

function addGameInCollection(game, callback) {
  DB.pool.query(
    `INSERT INTO games VALUES(null, ${game.idAPI}, '${game.gameName}', '${game.description}', ${game.minAge}, ${game.minNbPlayer}, ${game.maxNbPlayer}, ${game.minDuration}, ${game.maxDuration}, NOW(), ${game.idUser});`,
    (err, result) => {
      callback(err, result);
    }
  );
}

exports.selectAll = selectAll;
exports.addUser = addUser;
exports.selectUser = selectUser;
exports.deleteUser = deleteUser;
exports.addGameInCollection = addGameInCollection;
