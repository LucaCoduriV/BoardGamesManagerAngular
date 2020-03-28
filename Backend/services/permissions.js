const jwt = require('jsonwebtoken');

/**
 * Middleware qui vérifie les permissions de l'utilisateur
 * @param {*} req request
 * @param {*} res response
 * @param {callback} next callback
 */
function isSuperadmin(req, res, next) {
    let token = req.headers.token;
    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.superadmin == 1) {
        next();
    } else {
        res.status(400).send('you are not superadmin');
    }
}

exports.isSuperadmin = isSuperadmin;
