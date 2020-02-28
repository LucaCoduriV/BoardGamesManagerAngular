const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users-controller");
const gamesCtrl = require("../controllers/games-controller");
const surveysCtrl = require("../controllers/surveys-controller");

//TODO public route

//register login
router.post("/users", usersCtrl.registerUser); //done
router.get("/users", usersCtrl.login); //done

//search
router.get("/BGG/games/:name", gamesCtrl.searchGamesAPI); //done
router.get("/BGG/get-game-info-API/:id", gamesCtrl.getGameInfoAPI); //done

//vote anonyme
router.post("/users/:idUser/surveys/votes/anonyme", surveysCtrl.vote);

//TODO private route

//collection
router.get("/users/:idUser/games", usersCtrl.getCollection); //ok
router.get("/users/:idUser/games/:idGames", usersCtrl.getGameInfoCollection); //ok

router.post("/users/:idUser/games", usersCtrl.addGameInCollection); //ok
router.put("/users/:idUser/games/:idGame", usersCtrl.modifyGameInCollection); //ok
router.delete("/users/:idUser/games/:idGame", usersCtrl.deleteGameFromCollection); //ok

//survey
router.post("/users/:idUser/surveys", surveysCtrl.createSurvey); //ok
router.delete("/users/:idUser/surveys/:idSurvey", surveysCtrl.deleteSurvey); //ok

router.post("/users/:idUser/surveys/:idSurvey/vote", surveysCtrl.voteWhileLogged);
router.post("/users/:idUser/surveys/:idSurvey", surveysCtrl.getSharelinkSurvey);

router.get("/users/:idUser/surveys");

//admin
router.post("/delete-user", usersCtrl.deleteUser);

router.module.exports = router;
