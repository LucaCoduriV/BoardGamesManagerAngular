const usersManagement = require("../model/users-management");

//login register
function registerUser(req, res) {
    let userName = req.body.userName;
    let password = req.body.password;
    usersManagement.addUser({ userName: userName, password: password }, (err, result) => {
        if (err) {
            res.status(520).send(err);
        } else {
            res.status(201).send("Utilisateur ajouté avec succès !");
        }
    });
}

function login(req, res) {
    //   bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    //     // result == true
    // });

    usersManagement.selectAll((err, result) => {
        res.status(401).send(result);
    });
}

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
