const usersManagement = require("../model/users-management");

function getUsers(req, res) {
    usersManagement.selectAll((err, result) => {
        res.send(result);
    });
}

exports.getUsers = getUsers;
