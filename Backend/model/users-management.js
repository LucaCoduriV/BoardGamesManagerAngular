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
  if (game.idAPI == undefined) game.idAPI = null;
  if (game.gameName == undefined) game.gameName = null;
  if (game.description == undefined) game.description = null;
  if (game.minAge == undefined) game.minAge = null;
  if (game.minNbPlayer == undefined) game.minNbPlayer = null;
  if (game.maxNbPlayer == undefined) game.maxNbPlayer = null;
  if (game.minDuration == undefined) game.minDuration = null;
  if (game.maxDuration == undefined) game.maxDuration = null;
  if (game.creationDate == undefined) game.creationDate = null;
  else game.creationDate = "'" + game.creationDate + "'";

  DB.pool.query(
    `INSERT INTO games VALUES(null, ${game.idAPI}, '${game.gameName}', '${game.description}', ${game.minAge}, ${game.minNbPlayer}, ${game.maxNbPlayer}, ${game.minDuration}, ${game.maxDuration}, ${game.creationDate}, ${game.idUser});`,
    (err, result) => {
      callback(err, result);
    }
  );
}

function modifyGameInCollection(game, callback) {
  if (game.gameName == undefined) game.gameName = null;
  if (game.description == undefined) game.description = null;
  if (game.minAge == undefined) game.minAge = null;
  if (game.minNbPlayer == undefined) game.minNbPlayer = null;
  if (game.maxNbPlayer == undefined) game.maxNbPlayer = null;
  if (game.minDuration == undefined) game.minDuration = null;
  if (game.maxDuration == undefined) game.maxDuration = null;

  DB.pool.query(
    `UPDATE games 
    SET 
    name = '${game.gameName}', 
    description = '${game.description}', 
    minAge = ${game.minAge}, 
    minNbPlayer = ${game.minNbPlayer}, 
    maxNbPlayer = ${game.maxNbPlayer}, 
    minDuration = ${game.minDuration}, 
    maxDuration = ${game.maxDuration} 
    WHERE idGame = ${game.idGame};`,
    (err, result) => {
      callback(err, result);
    }
  );
}

function deleteGameFromCollection(idGame, callback) {
  DB.pool.query(`DELETE FROM games WHERE idGame = ${idGame}`, (err, result) => {
    callback(err, result);
  });
}

exports.selectAll = selectAll;
exports.addUser = addUser;
exports.selectUser = selectUser;
exports.deleteUser = deleteUser;
exports.addGameInCollection = addGameInCollection;
exports.modifyGameInCollection = modifyGameInCollection;
exports.deleteGameFromCollection = deleteGameFromCollection;
