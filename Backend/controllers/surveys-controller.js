function vote(req, res) {
    let ip = req.connection.remoteAddress;
}

//survey
function createSurvey(req, res) {}

function deleteSurvey(req, res) {}

function voteWhileLogged(req, res) {}

function getSharelinkSurvey(req, res) {}

exports.vote = vote;
exports.createSurvey = createSurvey;
exports.deleteSurvey = deleteSurvey;
exports.voteWhileLogged = voteWhileLogged;
exports.getSharelinkSurvey = getSharelinkSurvey;
