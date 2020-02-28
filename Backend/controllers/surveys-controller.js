function vote(req, res) {
    let ip = req.connection.remoteAddress;
    res.send(ip);
}

//survey
function createSurvey(req, res) {
    //TODO créer le vote
    //`INSERT INTO surveys(sharecode, date, idUser) VALUES('',NOW(),10);`
    //TODO créer les candidats du vote, récupérer l'id du survey créer avant
    //`INSERT INTO candidates(idSurvey, nbVotes, idAPI, idGame) VALUES(1,0,10,NULL);`
}

function deleteSurvey(req, res) {
    //`DELETE FROM bg_manager.surveys WHERE (idSurvey = '${survey.id}');`
}

function voteWhileLogged(req, res) {}

function getSharelinkSurvey(req, res) {}

exports.vote = vote;
exports.createSurvey = createSurvey;
exports.deleteSurvey = deleteSurvey;
exports.voteWhileLogged = voteWhileLogged;
exports.getSharelinkSurvey = getSharelinkSurvey;
