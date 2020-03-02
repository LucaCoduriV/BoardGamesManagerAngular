const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users-controller");
const gamesCtrl = require("../controllers/games-controller");
const surveysCtrl = require("../controllers/surveys-controller");
const jwt = require("../services/jwt");
const permission = require("../services/permissions");
//TODO public route

//register login
router.post("/users", usersCtrl.registerUser); //OK
router.get("/users/token", usersCtrl.login); //~OK (manque JWT)

//search
router.get("/BGG/games/:name", gamesCtrl.searchGamesAPI); //OK
router.get("/BGG/games/:idGame/details", gamesCtrl.getGameInfoAPI); //OK

//vote anonyme
router.post("/users/:idUser/surveys/:idSurvey/vote/anonyme", surveysCtrl.vote);

//TODO private route

//collection
router.get("/users/:idUser/games", jwt.verifyToken, usersCtrl.getCollection);
router.get("/users/:idUser/games/:idGames", jwt.verifyToken, usersCtrl.getGameInfoCollection);

router.post("/users/:idUser/games", jwt.verifyToken, usersCtrl.addGameInCollection); // OK
router.put("/users/:idUser/games/:idGame", jwt.verifyToken, usersCtrl.modifyGameInCollection); // OK
router.delete("/users/:idUser/games/:idGame", jwt.verifyToken, usersCtrl.deleteGameFromCollection); //OK

//survey
router.get("/users/:idUser/surveys");
router.post("/users/:idUser/surveys", jwt.verifyToken, surveysCtrl.createSurvey); //ok
router.delete("/users/:idUser/surveys/:idSurvey", jwt.verifyToken, surveysCtrl.deleteSurvey); //ok

router.post("/users/:idUser/surveys/:idSurvey/vote", jwt.verifyToken, surveysCtrl.voteWhileLogged);
router.get("/users/:idUser/surveys/:idSurvey", jwt.verifyToken, surveysCtrl.getSharelinkSurvey);

//admin
router.delete("/users/:idUser", jwt.verifyToken, permission.isSuperadmin, usersCtrl.deleteUser);

module.exports = router;
