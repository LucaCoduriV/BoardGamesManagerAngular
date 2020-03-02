const usersManagement = require("../model/users-management");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      bcrypt.compare(password, result[0].password, (err, hashOK) => {
        if (hashOK) {
          let token = jwt.sign({ idUser: result[0].idUser, superadmin: result[0].superadmin }, process.env.JWT_SECRET);
          res.status(201).send(token);
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
  let idUser = req.params.idUser;

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
      gameName: gameName,
      description: description,
      minAge: minAge,
      minNbPlayer: minNbPlayer,
      maxNbPlayer: maxNbPlayer,
      minDuration: minDuration,
      maxDuration: maxDuration
    },
    (err, result) => {
      if (err) {
        res.status(520).send(err);
      } else {
        res.status(201).send("Jeu modifié avec succès !");
      }
    }
  );
}

function deleteGameFromCollection(req, res) {
  let idGame = req.params.idGame;
  usersManagement.deleteGameFromCollection(idGame, (err, result) => {
    if (result.affectedRows == 0) {
      res.status(400).send("Le jeu à supprimer n'existe pas !");
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

exports.registerUser = registerUser;
exports.login = login;

exports.getCollection = getCollection;
exports.getGameInfoCollection = getGameInfoCollection;
exports.addGameInCollection = addGameInCollection;
exports.modifyGameInCollection = modifyGameInCollection;
exports.deleteGameFromCollection = deleteGameFromCollection;

exports.deleteUser = deleteUser;
