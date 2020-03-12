const DB = require("./db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

function selectAll(callback) {
    DB.pool.query("SELECT * FROM users;", (err, result) => {
        callback(err, result);
    });
}

function selectUser(username, callback) {
    DB.pool.query(`SELECT * FROM users WHERE login = '${username}';`, (err, result) => {
        callback(err, result);
    });
}

function addUser(user, callback) {
    if (user.id == undefined) user.id = null;

    function hashPassword() {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) {
                callback(err);
            } else {
                DB.pool.query(`INSERT INTO users(idUser, login, password) values(${user.id}, '${user.username}', '${hash}');`, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }
    //Check si l'utilisateur existe déjà dans la bd
    selectUser(user.username, (err, result) => {
        if (result.length > 0) {
            callback((err = true)); //oui il y a une erreur
        } else {
            hashPassword();
        }
    });
}

function deleteUser(idUser, callback) {
    DB.pool.query(`DELETE FROM users WHERE (idUser = '${idUser}');`, (err, result) => {
        callback(err, result);
    });
}

function getCollection(idUser, callback) {
    DB.pool.query(
        `SELECT * 
    FROM games 
    WHERE games.idUser = ${idUser};`,
        (err, result) => {
            callback(err, result);
        }
    );
}

function getGameInfoCollection(idUser, idGame, callback) {
    DB.pool.query(
        `SELECT * 
  FROM games 
  WHERE games.idUser = ${idUser} 
  AND games.idGame = ${idGame};`,
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
    if (game.creationDate == undefined) game.creationDate = null;
    if (game.image == undefined) game.image = null;
    if (game.duration == undefined) game.duration = null;

    DB.pool.query(
        "INSERT INTO games VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [game.gameName, game.description, game.minAge, game.minNbPlayer, game.maxNbPlayer, game.duration, game.creationDate, game.image, game.idUser],
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
    if (game.duration == undefined) game.duration = null;
    if (game.creationDate == undefined) game.creationDate = null;
    if (game.image == undefined) game.image = null;

    DB.pool.query(
        `UPDATE games 
    SET 
    name = ?,
    description = ?,
    minAge = ?,
    minNbPlayer = ?,
    maxNbPlayer = ?,
    duration = ?,
    creationDate = ?,
    image = ?
    WHERE idGame = ?
    AND idUser = ?;`,
        [
            game.gameName,
            game.description,
            game.minAge,
            game.minNbPlayer,
            game.maxNbPlayer,
            game.duration,
            game.creationDate,
            game.image,
            game.idGame,
            game.idUser
        ],
        (err, result) => {
            console.log(err);
            callback(err, result);
        }
    );
}

function deleteGameFromCollection(idGame, idUser, callback) {
    DB.pool.query(`DELETE FROM games WHERE idGame = ${idGame} and idUser = ${idUser}`, (err, result) => {
        callback(err, result);
    });
}

exports.selectAll = selectAll;
exports.addUser = addUser;
exports.selectUser = selectUser;
exports.deleteUser = deleteUser;
exports.getCollection = getCollection;
exports.getGameInfoCollection = getGameInfoCollection;
exports.addGameInCollection = addGameInCollection;
exports.modifyGameInCollection = modifyGameInCollection;
exports.deleteGameFromCollection = deleteGameFromCollection;
