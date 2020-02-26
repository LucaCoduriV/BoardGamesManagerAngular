const usersManagement = require("../model/users-management");

//login register
function registerUser() {}

function login() {}

//collection
function getCollection() {}

function getGameInfoCollection() {}

function addGameInCollection() {}

function modifyGameInCollection() {}
function deleteGameFromCollection() {}

//admin
function deleteUser() {}

exports.registerUser = registerUser;
exports.login = login;

exports.getCollection = getCollection;
exports.getGameInfoCollection = getGameInfoCollection;
exports.addGameInCollection = addGameInCollection;
exports.modifyGameInCollection = modifyGameInCollection;
exports.deleteGameFromCollection = deleteGameFromCollection;

exports.deleteUser = deleteUser;
