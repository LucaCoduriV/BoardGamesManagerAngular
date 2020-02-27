const DB = require("./db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

function selectAll(callback) {
    DB.pool.query("SELECT * FROM users;", (err, result) => {
        callback(err, result);
    });
}

function selectUser(username, callback) {
    DB.pool.query(`SELECT * FROM users WHERE login = '${username}';`, (err, result) => {
        callback(err, result);
    });
}

function addUser(user, callback) {
    function hashPassword() {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) {
                callback(err);
            } else {
                DB.pool.query(`INSERT INTO users(login, password) values('${user.username}', '${hash}');`, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }

    selectUser(user.username, (err, result) => {
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

function deleteUser(username, callback) {
    DB.pool.query(`DELETE FROM bg_manager.users WHERE (login = '${username}');`, (err, result) => {
        callback(err, result);
    });
}

exports.selectAll = selectAll;
exports.addUser = addUser;
exports.selectUser = selectUser;
exports.deleteUser = deleteUser;

