const usersManagement = require("../model/users-management");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login register
function registerUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    usersManagement.addUser({ username: username, password: password }, (err, result) => {
        if (err) {
            res.status(409).send("L'utilisateur existe déjà");
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
            res.status(401).send("Non autorisé");
        } else {
            //checker si le hash correspond
            bcrypt.compare(password, result[0].password, (err, hashOK) => {
                if (hashOK) {
                    let token = jwt.sign({ idUser: result[0].idUser, username: result[0].login, superadmin: result[0].superadmin }, process.env.JWT_SECRET);
                    res.status(201).send({ token: token });
                } else {
                    res.status(401).send("Non autorisé");
                }
            });
        }
    });
}

//collection
function getCollection(req, res) {
    let idUser = req.jwt.idUser;

    usersManagement.getCollection(idUser, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
}

function getGameInfoCollection(req, res) {
    let idUser = req.jwt.idUser;
    let idGame = req.params.idGames;

    usersManagement.getGameInfoCollection(idUser, idGame, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
}

function addGameInCollection(req, res) {
    //La liste des paramètres récupéré du formulaire
    let idAPI = req.body.idAPI;
    let gameName = req.body.gameName;
    let description = req.body.description;
    let minAge = req.body.minAge;
    let minNbPlayer = req.body.minNbPlayer;
    let maxNbPlayer = req.body.maxNbPlayer;
    let minDuration = req.body.minDuration;
    let maxDuration = req.body.maxDuration;
    let creationDate = req.body.creationDate;
    let idUser = req.jwt.idUser;

    usersManagement.addGameInCollection(
        {
            idAPI: idAPI,
            gameName: gameName,
            description: description,
            minAge: minAge,
            minNbPlayer: minNbPlayer,
            maxNbPlayer: maxNbPlayer,
            minDuration: minDuration,
            maxDuration: maxDuration,
            creationDate: creationDate,
            idUser: idUser
        },
        (err, result) => {
            if (err) {
                res.status(520).send(err);
            } else {
                res.status(201).send("Jeu ajouté avec succès !");
            }
        }
    );
}

function modifyGameInCollection(req, res) {
    let idGame = req.params.idGame;
    let idUser = req.jwt.idUser;
    let gameName = req.body.gameName;
    let description = req.body.description;
    let minAge = req.body.minAge;
    let minNbPlayer = req.body.minNbPlayer;
    let maxNbPlayer = req.body.maxNbPlayer;
    let minDuration = req.body.minDuration;
    let maxDuration = req.body.maxDuration;

    usersManagement.modifyGameInCollection(
        {
            idGame: idGame,
            idUser: idUser,
            gameName: gameName,
            description: description,
            minAge: minAge,
            minNbPlayer: minNbPlayer,
            maxNbPlayer: maxNbPlayer,
            minDuration: minDuration,
            maxDuration: maxDuration
        },
        (err, result) => {
            if (result.affectedRows == 0) {
                res.status(500).send("Impossible de modifier le jeu");
            } else {
                res.status(201).send("Jeu modifié avec succès !");
            }
        }
    );
}

function deleteGameFromCollection(req, res) {
    let idGame = req.params.idGame;
    let idUser = req.jwt.idUser;

    usersManagement.deleteGameFromCollection(idGame, idUser, (err, result) => {
        if (result.affectedRows == 0) {
            res.status(400).send("Impossible de supprimer le jeu");
        } else {
            res.status(200).send("Jeu supprimé avec succès !");
        }
    });
}

//admin
function deleteUser(req, res) {
    usersManagement.deleteUser(req.params.idUser, (err, result) => {
        if (result.affectedRows == 0) {
            res.status(404).send("user do not exist!");
        } else {
            res.status(200).send("user deleted succesfully!");
        }
    });
}

function getUsers(req, res) {
    usersManagement.selectAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            //supprimer la clé password
            result.forEach(element => {
                delete element.password;
            });
            res.status(200).send(result);
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
exports.getUsers = getUsers;
