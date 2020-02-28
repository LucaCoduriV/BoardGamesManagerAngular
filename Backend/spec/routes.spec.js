var colors = require("colors");
const request = require("supertest");
const app = require("../index");
const usrMgr = require("../model/users-management");
const DB = require("../model/db");

const user = {
    id: 10,
    username: "testUser",
    password: "testPassword"
};

const wrongUser = {
    id: 11,
    username: "wrongUser",
    password: "fakePassword"
};

const vote = {
    id: 10,
    idUser: 10,
    idCandidate: 10
};

describe("DB", () => {
    it("should connect to DB", done => {
        DB.pool.query("SELECT * FROM users", (err, result) => {
            if (err) console.error("MYSQL ERROR: ".magenta + err.code);

            expect(err).toBeNull();
            done();
        });
    });
});

describe("route", () => {
    //Register
    describe("/users", () => {
        //supprimer l'utilisateur de test avant tous les tests
        beforeEach(done => {
            DB.pool.query(`DELETE FROM users WHERE (login = '${user.username}');`, done);
        });

        it("should return 201 and create user", done => {
            request(app)
                .post("/users")
                .send(user)
                .expect(201, done);
        });

        it("should create a user", done => {
            request(app)
                .post("/users")
                .send(user)
                .then(response => {
                    usrMgr.selectUser(user.username, (err, result) => {
                        expect(result.length).toEqual(1);
                        done();
                    });
                });
        });
    });

    //Login
    describe("/users/token", () => {
        //ajoute un utilisateur avant tous les tests
        beforeAll(done => {
            usrMgr.addUser(user, done);
        });

        it("should return 201", done => {
            request(app)
                .get("/users/token")
                .send(user)
                .expect(201, done);
        });

        it("should return 401, user don't exist", done => {
            request(app)
                .get("/users/token")
                .send(wrongUser)
                .expect(401, done);
        });

        it("should return 401, user exist but wrong password", done => {
            request(app)
                .get("/users/token")
                .send({ username: user.username, password: wrongUser.password })
                .expect(401, done);
        });
    });

    //recherche
    describe("/BGG/games/:name", () => {
        it("should return search result", done => {
            request(app)
                .get("/BGG/games/monopoly")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeDefined();
                    done();
                });
        });

        it("should return no result", done => {
            request(app)
                .get("/BGG/games/sakfhksjhf")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeUndefined();
                    done();
                });
        });
    });

    //info à propos d'un jeu
    describe("/BGG/games/:idGame/details", () => {
        it("should return search result", done => {
            request(app)
                .get("/BGG/games/2740/details") //aero Monopoly
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeDefined();
                    done();
                });
        });

        it("should return no result", done => {
            request(app)
                .get("/BGG/games/999999999999/details")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeUndefined();
                    done();
                });
        });
    });

    //vote anonyme
    describe("/users/:idUser/surveys/:idSurvey/vote/anonyme", () => {
        //ajoute un utilisateur avant tous les test
        beforeAll(done => {
            usrMgr.addUser(user, done);
        });

        it("should return 200", done => {
            request(app)
                .post("/users/:idUser/surveys/:idSurvey/vote/anonyme")
                .send(vote)
                .expect(200, done);
        });

        it("should create a vote in DB", done => {
            request(app)
                .post("/users/:idUser/surveys/:idSurvey/vote/anonyme")
                .send(vote)
                .then(response => {
                    DB.pool.query(`SELECT * FROM votes WHERE idVote = ${vote.id}`, (err, result) => {
                        expect(result.length).toEqual(1);
                        done();
                    });
                });
        });
        afterAll(done => {
            usrMgr.deleteUser(user.username, done);
        });
    });

    //get collection
    describe("/users/:idUser/games", () => {
        it("should return 200", done => {
            request(app)
                .post(`/users/${user.id}/games`)
                .send(user)
                .expect(200, done);
        });

        it("should return all keys", done => {
            request(app)
                .get(`/users/${user.id}/games`)
                .send(user)
                .then(response => {
                    keysArr = Object.keys(response[0]);
                    excpectedArray = ["idGame", "idAPI", "name", "imgUrl"];

                    expect(keysArr).toEqual(excpectedArray);
                });
        });

        it("should return 400", done => {
            request(app)
                .get(`/users/${user.id}/games`)
                .send(wrongUser)
                .expect(400, done);
        });
    });

    //info d'un jeu de la collection
    describe("/users/:idUser/games/:idGame", () => {
        //TODO beforeAll add fake game in db
        //TODO afterAll remove fake game from db

        it("should return 200", done => {
            request(app)
                .get(`/users/:idUser/games/${game.id}`)
                .send(game.id)
                .expect(200, done);
        });

        it("should return all keys", done => {
            request(app)
                .get(`/users/:idUser/games/${game.id}`)
                .send(game.id)
                .then(response => {
                    keysArr = Object.keys(response[0]);
                    excpectedArray = [
                        "idGame",
                        "idAPI",
                        "name",
                        "description",
                        "minAge",
                        "minNbPlayer",
                        "maxNbPlayer",
                        "minDuration",
                        "maxDuration",
                        "creationDate"
                    ];

                    expect(keysArr).toEqual(excpectedArray);
                });
        });

        it("should return 400", done => {
            request(app)
                .post("/get-game-info-collection")
                .send(wrongGame.id)
                .expect(400, done);
        });
    });

    //ajouter un jeu dans la collection
    describe("/users/:idUser/games", () => {});

    //modifier un jeu de la collection
    describe("/users/:idUser/games/:idGame", () => {});

    //supprimer un jeu de la collection
    describe("/users/:idUser/games/:idGame", () => {});

    //créer un sondage
    describe("/users/:idUser/surveys", () => {
        it("should return 200", done => {
            request(app)
                .post("/users/:idUser/surveys")
                .send({ survey: survey, games: [game] })
                .expect(200, done);
        });

        it("should create survey", done => {
            done();
        });

        it("should add game into survey", done => {
            done();
        });

        it("should return 400", done => {
            request(app)
                .post("/users/:idUser/surveys")
                .expect(400, done);
        });
    });

    //vote non anonyme
    describe("/users/:idUser/surveys/:idSurvey/vote", () => {});

    //get sharelink
    describe("/users/:idUser/surveys/:idSurvey", () => {
        it("should return 200", done => {
            request(app)
                .get("/users/:idUser/surveys/:idSurvey")
                .send(survey.id)
                .expect(200, done);
        });

        it("should return sharelink", done => {
            request(app)
                .get("/users/:idUser/surveys/:idSurvey")
                .send(survey.id)
                .then(response => {
                    expect(response[0].sharelink).toBeDefined();
                    done();
                });
        });

        it("should return 400", done => {
            request(app)
                .get("/users/:idUser/surveys/:idSurvey")
                .send(fakeSurvey.id)
                .expect(400, done);
        });
    });

    //suppimer un utilisateur
    describe("/users/:idUser", () => {
        beforeEach(done => {
            DB.pool.query(`INSERT INTO users(idUser, login, password) values(${user.id}, '${user.username}', '${user.password}');`, done);
        });

        it("should return 200", done => {
            request(app)
                .delete(`/users/${user.id}`)
                .send(user)
                .expect(200, done);
        });

        it("should delete a user", done => {
            request(app)
                .delete(`/users/${user.id}`)
                .send(user)
                .then(response => {
                    usrMgr.selectUser(user.username, (err, result) => {
                        expect(result.length).toEqual(0);
                        done();
                    });
                });
        });

        it("should return 404", done => {
            request(app)
                .delete(`/users/${wrongUser.id}`)
                .send(wrongUser)
                .expect(404, done);
        });
    });

    afterAll(done => {
        DB.pool.query(`DELETE FROM users WHERE (login = '${user.username}');`, done);
    });
});
