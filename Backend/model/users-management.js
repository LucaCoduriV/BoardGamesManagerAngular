const DB = require("./db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

function selectAll(callback) {
    DB.pool.query("SELECT * FROM users;", (err, result) => {
        callback(err, result);
    });
}

function selectUser(userName, callback) {
    DB.pool.query(`SELECT * FROM users WHERE login = '${userName}';`, (err, result) => {
        callback(err, result);
    });
}

function addUser(user, callback) {
    function hashPassword() {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) {
                callback(err);
            } else {
                DB.pool.query(`INSERT INTO users(login, password) values('${user.userName}', '${hash}');`, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }

    selectUser(user.userName, (err, result) => {
        if (result.length > 0) {
            err = {
                code: 1,
                message: "Nom d'utilisateur déjà pris"
            };
            callback(err);
        } else {
            hashPassword();
        }
    });
}

exports.selectAll = selectAll;
exports.addUser = addUser;
