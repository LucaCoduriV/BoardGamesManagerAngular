const surveyManagement = require('../model/survey-management');

/**
 * Route pour créer un sondage
 * @param {*} req request
 * @param {*} res response
 */
function createSurvey(req, res) {
    let idUser = req.params.idUser;
    let candidates = req.body.candidates;

    surveyManagement.insertSurvey(idUser, (err, result, shareCode) => {
        let idSurvey = result.insertId;
        try {
            surveyManagement.insertCandidate(candidates, idSurvey, () => {
                res.status(200).send({
                    message: 'Inséré avec succès !',
                    idSurvey: idSurvey,
                    shareCode: shareCode
                });
            });
        } catch (error) {
            res.status(400).send(error);
        }
    });
}

/**
 * Route pour supprimmer un Sondage
 * @param {*} req request
 * @param {*} res response
 */
function deleteSurvey(req, res) {
    surveyManagement.deleteSurvey(req.params.idSurvey, (err, result) => {
        if (err) res.send(err);
        else res.send('deleted succefully');
    });
}

/**
 * Route pour récupérer un Sondage avec son sharecode
 * @param {*} req request
 * @param {*} res response
 */
function getSurveyByShareCode(req, res) {
    const shareCode = req.params.shareCode;

    surveyManagement.selectSurveyByShareCode(shareCode, (err, result) => {
        res.status(200).send(result);
    });
}
/**
 * Route pour récupérer les sondages d'un utilisateur
 * @param {*} req request
 * @param {*} res response
 */
function getSurveyByUserID(req, res) {
    const idUser = req.params.idUser;

    surveyManagement.selectSurveyByUserID(idUser, (err, result) => {
        res.status(200).send(result);
    });
}
/**
 * Route pour récupérer les sondages
 * @param {*} req request
 * @param {*} res response
 */
function getAllSurveys(req, res) {
    surveyManagement.selectSurveys((err, result) => {
        res.status(200).send(result);
    });
}

/**
 * Route pour récupérer les candidats d'un sondage
 * @param {*} req request
 * @param {*} res response
 */
function getCandidates(req, res) {
    const idSurvey = req.params.idSurvey;
    surveyManagement.selectCanditatesBySurveyID(idSurvey, (err, result) => {
        res.status(200).send(result);
    });
}
/**
 * Route pour voter pour un candidat
 * @param {*} req request
 * @param {*} res response
 */
function vote(req, res) {
    let ip = req.connection.remoteAddress || '127.0.0.1';
    let idCandidate = req.params.idCandidate;
    let idUser = req.params.idUser;
    let idSurvey = req.params.idSurvey;
    console.log(idCandidate);

    //check si l'ip existe déjà dans la db pour le survey
    surveyManagement.countIpForSurvey(idSurvey, ip, (err, result) => {
        if (result[0].nbIP > 0) res.status(400).send('you have already voted');
        else {
            //puis ajouter le vote dans la bd
            surveyManagement.insertVote(ip, idCandidate, idUser, (err, result) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(result);

                surveyManagement.updateVoteNB(idCandidate);
            });
        }
    });

    //
    //
}

/**
 * Route pour savoir si une ip à déjà été utilisé pour voté
 * @param {*} req request
 * @param {*} res response
 */
function hasVoted(req, res) {
    const ip = req.connection.remoteAddress || '127.0.0.1';
    const idSurvey = req.params.idSurvey;

    surveyManagement.countIpForSurvey(idSurvey, ip, (err, result) => {
        if (result[0].nbIP > 0) res.status(200).send({ hasVoted: true });
        if (result[0].nbIP == 0) res.status(200).send({ hasVoted: false });
        if (err) res.status(500).send(err);
    });
}

exports.vote = vote;
exports.createSurvey = createSurvey;
exports.deleteSurvey = deleteSurvey;
exports.voteWhileLogged = voteWhileLogged;
exports.getAllSurveys = getAllSurveys;
exports.getSurveyByShareCode = getSurveyByShareCode;
exports.getSurveyByUserID = getSurveyByUserID;
exports.getCandidates = getCandidates;
exports.hasVoted = hasVoted;
