const DB = require('./db');
const bcrypt = require('bcrypt');

/**
 * la taille du sel utilisé pour le hash
 */
const saltRounds = 10;

/**
 * Récupérer tous les utilisateur dans la bd
 * @param {*} callback callback
 */
function selectAll(callback) {
    DB.pool.query('SELECT * FROM users;', (err, result) => {
        callback(err, result);
    });
}
/**
 * Permet de récupérer les infos d'un utilisateur
 * @param {*} username nom d'utilisateur
 * @param {*} callback callback
 */
function selectUser(username, callback) {
    DB.pool.query(`SELECT * FROM users WHERE login = '${username}';`, (err, result) => {
        callback(err, result);
    });
}
/**
 * Ajouter un utilisateur dans la bd
 * @param {*} user callback
 * @param {*} callback
 */
function addUser(user, callback) {
    if (user.id == undefined) user.id = null;

    /**
     * permet de hasher le mot de passe
     */
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
    //Check si l'utilisateur existe déjà dans la bd
    selectUser(user.username, (err, result) => {
        if (result.length > 0) {
            callback((err = true)); //oui il y a une erreur
        } else {
            hashPassword();
        }
    });
}

/**
 * Supprimmer un utilisateur de la bd
 * @param {*} idUser id de l'utilisateur
 * @param {*} callback callback
 */
function deleteUser(idUser, callback) {
    DB.pool.query(`DELETE FROM users WHERE (idUser = '${idUser}');`, (err, result) => {
        callback(err, result);
    });
}
/**
 * permet de récupérer la collection de jeux d'un utilisateur
 * @param {*} idUser id de l'utilisateur
 * @param {*} callback callback
 */
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
/**
 * permet de récupérer les infos d'un jeu
 * @param {*} idUser id de l'utilisateur
 * @param {*} idGame id du jeu
 * @param {*} callback callback
 */
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
/**
 * Ajouter un jeu dans la collection
 * @param {*} game game
 * @param {*} callback callback
 */
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
        'INSERT INTO games VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [
            game.gameName,
            game.description,
            game.minAge,
            game.minNbPlayer,
            game.maxNbPlayer,
            game.duration,
            game.creationDate,
            game.image,
            game.idUser
        ],
        (err, result) => {
            callback(err, result);
        }
    );
}
/**
 * Permet de modifier un jeu dans la bd
 * @param {*} game objet contenant les info d'un jeu
 * @param {*} callback callback
 */
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
/**
 * Supprimmer un jeu de la collection d'un utilisateur
 * @param {*} idGame id du jeu
 * @param {*} idUser id d'un utilisateur
 * @param {*} callback callback
 */
function deleteGameFromCollection(idGame, idUser, callback) {
    DB.pool.query(
        `DELETE FROM games WHERE idGame = ${idGame} and idUser = ${idUser}`,
        (err, result) => {
            callback(err, result);
        }
    );
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
