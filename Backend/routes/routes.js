const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users-controller");
const gamesCtrl = require("../controllers/games-controller");
const surveysCtrl = require("../controllers/surveys-controller");
const jwt = require("../services/jwt");
const permission = require("../services/permissions");
// public route

//register login
router.post("/users", usersCtrl.registerUser); //OK
router.post("/login", usersCtrl.login); //OK

//search
router.get("/BGG/games/:name", gamesCtrl.searchGamesAPI); //OK
router.get("/BGG/games/:idGame/details", gamesCtrl.getGameInfoAPI); //OK

//survey
router.post("/users/:idUser/surveys/:idSurvey/candidates/:idCandidate/vote", surveysCtrl.vote); //OK
router.get("/users/surveys/:shareCode", surveysCtrl.getSurveyByShareCode); //OK
router.get("/users/:idUser/surveys", surveysCtrl.getSurveyByUserID); //OK
router.get("/users/surveys", surveysCtrl.getAllSurveys); //ok
router.get("/users/surveys/:idSurvey/candidates", surveysCtrl.getCandidates); //ok
router.get("/surveys/:idSurvey/hasVoted", surveysCtrl.hasVoted);

// private route

//collection
router.get("/users/:idUser/games", jwt.verifyToken, usersCtrl.getCollection); //OK
router.get("/users/:idUser/games/:idGames", jwt.verifyToken, usersCtrl.getGameInfoCollection); //OK

router.post("/users/:idUser/games", jwt.verifyToken, usersCtrl.addGameInCollection); // OK
router.put("/users/:idUser/games/:idGame", jwt.verifyToken, usersCtrl.modifyGameInCollection); // OK
router.delete("/users/:idUser/games/:idGame", jwt.verifyToken, usersCtrl.deleteGameFromCollection); //OK

//survey

router.post("/users/:idUser/surveys", jwt.verifyToken, surveysCtrl.createSurvey); //ok
router.delete("/users/:idUser/surveys/:idSurvey", jwt.verifyToken, surveysCtrl.deleteSurvey); //ok

//router.post("/users/:idUser/surveys/:idSurvey/vote", jwt.verifyToken, surveysCtrl.voteWhileLogged);

//admin
router.get("/users", jwt.verifyToken, permission.isSuperadmin, usersCtrl.getUsers);
router.delete("/users/:idUser", jwt.verifyToken, permission.isSuperadmin, usersCtrl.deleteUser); //OK

module.exports = router;
