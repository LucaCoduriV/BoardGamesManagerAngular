const usersManagement = require("../model/users-management");
const bcrypt = require("bcrypt");

//login register
function registerUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    usersManagement.addUser({ username: username, password: password }, (err, result) => {
        if (err) {
            res.status(520).send(err);
        } else {
            res.status(201).send("Utilisateur ajouté avec succès !");
        }
    });
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    usersManagement.selectUser(username, (err, result) => {
        if (result.length == 0) {
            //si l'utilisateur n'existe pas dans la bd
            res.status(401).send("Non authorisé");
        } else {
            //checker si le hash correspond
            bcrypt.compare(password, result[0].password, (err, result) => {
                if (result) {
                    res.status(201).send("Utilisateur connecté avec succès");
                } else {
                    res.status(401).send("Non authorisé");
                }
            });
        }
    });
}

//collection
function getCollection() {
    //      `SELECT games.name, games.description, games.minAge, games.minNbPlayer, games.maxNbPlayer, games.minDuration, games.maxDuration, games.creationDate FROM has_games
    //      inner join games on games.idGame = has_games.idGame
    //      WHERE has_games.idUser = ${user.id};`
}

function getGameInfoCollection() {}

function addGameInCollection() {}

function modifyGameInCollection() {}
function deleteGameFromCollection() {}

//admin
function deleteUser(req, res) {
    usersManagement.deleteUser(req.body.username, (err, result) => {
        if (result.affectedRows == 0) {
            res.status(404).send("user do not exist!");
        } else {
            res.status(200).send("user deleted succesfully!");
        }
    });
}

exports.registerUser = registerUser;
exports.login = login;

exports.getCollection = getCollection;
exports.getGameInfoCollection = getGameInfoCollection;
exports.addGameInCollection = addGameInCollection;
exports.modifyGameInCollection = modifyGameInCollection;
exports.deleteGameFromCollection = deleteGameFromCollection;

exports.deleteUser = deleteUser;
