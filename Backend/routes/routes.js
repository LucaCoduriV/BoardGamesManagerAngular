const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users-controller");
const gamesCtrl = require("../controllers/games-controller");
const surveysCtrl = require("../controllers/surveys-controller");

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
router.get("/users/:idUser/games", usersCtrl.getCollection);
router.get("/users/:idUser/games/:idGames", usersCtrl.getGameInfoCollection);

router.post("/users/:idUser/games", usersCtrl.addGameInCollection); // OK
router.put("/users/:idUser/games/:idGame", usersCtrl.modifyGameInCollection);
router.delete(
  "/users/:idUser/games/:idGame",
  usersCtrl.deleteGameFromCollection
); //OK

//survey
router.post("/users/:idUser/surveys", surveysCtrl.createSurvey); //ok
router.delete("/users/:idUser/surveys/:idSurvey", surveysCtrl.deleteSurvey); //ok

router.post(
  "/users/:idUser/surveys/:idSurvey/vote",
  surveysCtrl.voteWhileLogged
);
router.get("/users/:idUser/surveys/:idSurvey", surveysCtrl.getSharelinkSurvey);

//admin
router.delete("/users/:idUser", usersCtrl.deleteUser);

module.exports = router;
