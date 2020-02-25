const DB = require("./db");

function selectAll(callback) {
    DB.pool.query("SELECT * FROM users;", (err, result) => {
        callback(err, result);
    });
}

exports.selectAll = selectAll;
