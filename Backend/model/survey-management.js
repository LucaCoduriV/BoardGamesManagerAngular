const DB = require("./db");

const uuid = require("uuid");
//import { v1 as uuidv1 } from "uuid";

function insertSurvey(idUser, callback) {
    const shareCode = uuid.v1();
    DB.pool.query(`INSERT INTO surveys(sharecode, date, idUser) VALUES('${shareCode}',NOW(),${idUser});`, (err, result) => {
        callback(err, result, shareCode);
    });
}

function insertCandidate(candidates, idSurvey, callback) {
    const promises = [];

    candidates.map(candidate => {
        if (!candidate.idAPI) candidate.idAPI = null;
        if (!candidate.idGame) candidate.idGame = null;

        promises.push(
            new Promise((resolve, reject) => {
                DB.pool.query(
                    `INSERT INTO candidates(idSurvey, nbVotes, idAPI, idGame) VALUES(? , 0, ?, ?);`,
                    [idSurvey, candidate.idAPI, candidate.idGame],
                    (err, result) => {
                        if (err) throw err;
                        resolve();
                    }
                );
            })
        );
    });
    Promise.all(promises).then(callback());
}

function deleteSurvey(idSurvey, callback) {
    console.log(idSurvey);
    DB.pool.query(`DELETE FROM surveys WHERE (idSurvey = ${idSurvey});`, (err, result) => {
        callback(err, result);
    });
}

function selectSurveyByShareCode(shareCode, callback) {
    DB.pool.query(`SELECT * FROM surveys WHERE shareCode = '${shareCode}';`, (err, result) => {
        callback(err, result);
    });
}

function selectSurveyByUserID(idUser, callback) {
    DB.pool.query(`SELECT * FROM surveys WHERE idUser = ${idUser};`, (err, result) => {
        callback(err, result);
    });
}

function selectSurveys(callback) {
    DB.pool.query(`SELECT * FROM surveys;`, (err, result) => {
        callback(err, result);
    });
}

function selectCanditatesBySurveyID(idSurvey, callback) {
    DB.pool.query(`SELECT * FROM candidates WHERE idSurvey = ${idSurvey};`, (err, result) => {
        callback(err, result);
    });
}

function insertVote(ip, idCandidate, idUser, callback) {
    if (idUser == undefined) idUser = "";

    DB.pool.query(`INSERT INTO votes (idUser, idCandidate, ip) VALUES ('${idUser}','${idCandidate}', '${ip}');`, (err, result) => {
        callback(err, result);
    });
}

function updateVoteNB(idCandidate, callback) {
    DB.pool.query(`Select count(idCandidate) as totalVote FROM votes WHERE (idCandidate = '${idCandidate}');`, (err, result) => {
        let totalVote = result[0].totalVote;

        DB.pool.query(`UPDATE candidates SET nbVotes = '${totalVote}' WHERE (idCandidate = '${idCandidate}');`);
    });
}

function countIpForSurvey(idSurvey, ip, callback) {
    DB.pool.query(
        `SELECT count(v.ip)as nbIP FROM candidates c, votes v WHERE c.idSurvey = ${idSurvey} AND c.idCandidate = v.idCandidate AND v.ip like '${ip}'`,
        (err, result) => {
            callback(err, result);
        }
    );
}

exports.insertSurvey = insertSurvey;
exports.insertCandidate = insertCandidate;
exports.deleteSurvey = deleteSurvey;
exports.selectSurveyByShareCode = selectSurveyByShareCode;
exports.selectSurveys = selectSurveys;
exports.selectSurveyByUserID = selectSurveyByUserID;
exports.selectCanditatesBySurveyID = selectCanditatesBySurveyID;
exports.insertVote = insertVote;
exports.updateVoteNB = updateVoteNB;
exports.countIpForSurvey = countIpForSurvey;
