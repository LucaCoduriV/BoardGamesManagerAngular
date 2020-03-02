const DB = require("./db");

const uuid = require("uuid");
//import { v1 as uuidv1 } from "uuid";

function insertSurvey(idUser, callback) {
  DB.pool.query(
    `INSERT INTO surveys(sharecode, date, idUser) VALUES('${uuid.v1()}',NOW(),${idUser});`,
    (err, result) => {
      callback(err, result);
    }
  );
}

function insertCandidate(candidates, idSurvey, callback) {
  const promises = [];

  candidates.map(candidate => {
    promises.push(
      new Promise((resolve, reject) => {
        DB.pool.query(
          `INSERT INTO candidates(idSurvey, nbVotes, idAPI, idGame) VALUES(${idSurvey},0,${candidate.idAPI},${candidate.idGame});`,
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
  DB.pool.query(
    `DELETE FROM surveys WHERE (idSurvey = ${idSurvey});`,
    (err, result) => {
      callback(err, result);
    }
  );
}

exports.insertSurvey = insertSurvey;
exports.insertCandidate = insertCandidate;
exports.deleteSurvey = deleteSurvey;
