const fetch = require("node-fetch");
const parseString = require("xml2js").parseString;

function searchGamesAPI(req, res) {
    fetch("https://www.boardgamegeek.com/xmlapi2/search?query=Aero%20Monopoly")
        .then(result => result.text())
        .then(body =>
            parseString(
                body,
                {
                    explicitRoot: false,
                    mergeAttrs: true
                },
                function(err, result) {
                    res.send(result);
                }
            )
        );
}

function getGameInfoAPI() {}

exports.searchGamesAPI = searchGamesAPI;
exports.getGameInfoAPI = getGameInfoAPI;
