const jwt = require('jsonwebtoken');
/**
 * Un middleware qui vérifie le token de l'utilisateur.
 * @param {*} req request
 * @param {*} res response
 * @param {callback} next callback
 */
function verifyToken(req, res, next) {
    let token = req.headers.token;
    try {
        req.jwt = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(400).send('Accès refusé');
    }
}

exports.verifyToken = verifyToken;
