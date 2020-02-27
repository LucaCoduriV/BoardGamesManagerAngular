const fetch = require("node-fetch");
const parseString = require("xml2js").parseString;

function searchGamesAPI(req, res) {
    let gameName = req.params.name;
    fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${gameName}`)
        .then(result => result.text())
        .then(body =>
            parseString(body, { explicitRoot: false, mergeAttrs: true, explicitArray: false }, (err, result) => {
                res.status(200).send(result);
            })
        );
}

function getGameInfoAPI(req, res) {
    let gameID = req.params.id;
    fetch(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gameID}`)
        .then(result => result.text())
        .then(body =>
            parseString(body, { explicitRoot: false, mergeAttrs: true, explicitArray: false }, (err, result) => {
                res.status(200).send(result);
            })
        );
}

exports.searchGamesAPI = searchGamesAPI;
exports.getGameInfoAPI = getGameInfoAPI;
