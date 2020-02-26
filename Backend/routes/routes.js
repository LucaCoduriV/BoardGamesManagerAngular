const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users-controller");
const gamesCtrl = require("../controllers/games-controller");
const surveysCtrl = require("../controllers/surveys-controller");

//TODO public route

//register login
router.post("/register-user", usersCtrl.registerUser);
router.post("/login", usersCtrl.login);

//search
router.post("/search-games-API", gamesCtrl.searchGamesAPI);
router.post("/get-game-info-API", gamesCtrl.getGameInfoAPI);

//survey
router.post("/vote", surveysCtrl.vote);

//TODO private route

//collection
router.post("/get-collection", usersCtrl.getCollection);
router.post("/get-game-info-collection", usersCtrl.getGameInfoCollection);
router.post("/add-game-in-collection", usersCtrl.addGameInCollection);
router.post("/modify-game-in-collection", usersCtrl.modifyGameInCollection);
router.post("/delete-game-from-collection", usersCtrl.deleteGameFromCollection);

//survey
router.post("/create-survey", surveysCtrl.createSurvey);
router.post("/delete-survey", surveysCtrl.deleteSurvey);
router.post("/vote-while-logged", surveysCtrl.voteWhileLogged);
router.post("/get-sharelink-survey", surveysCtrl.getSharelinkSurvey);

//admin
router.post("/delete-user", usersCtrl.deleteUser);

module.exports = router;
