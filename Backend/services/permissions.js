const jwt = require("jsonwebtoken");

function isSuperadmin(req, res, next) {
    let token = req.headers.token;
    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDecoded);
    if (tokenDecoded.superadmin == 1) {
        next();
    } else {
        res.status(400).send("you are not superadmin");
    }
}

exports.isSuperadmin = isSuperadmin;
