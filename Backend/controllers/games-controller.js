const fetch = require("node-fetch");
const parseString = require("xml2js").parseString;

function searchGamesAPI(req, res) {
    let gameName = req.params.name;
    fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${gameName}`)
        .then(result => result.text())
        .then(body =>
            parseString(body, { explicitRoot: false, mergeAttrs: true, explicitArray: false }, (err, result) => {
                res.status(200).send(result);
                //TODO le cas ou la recherche ne retourne rien
            })
        );
}

function getGameInfoAPI(req, res) {
    let gameID = req.params.idGame;
    fetch(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gameID}`)
        .then(result => result.text())
        .then(body =>
            parseString(body, { explicitRoot: false, mergeAttrs: true, explicitArray: false }, (err, result) => {
                res.status(200).send(result);
                //TODO le cas ou l'id n'existe pas
            })
        );
}

exports.searchGamesAPI = searchGamesAPI;
exports.getGameInfoAPI = getGameInfoAPI;
