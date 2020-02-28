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
    id: 10,
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
    describe("/register", () => {
        //supprimer l'utilisateur de test avant tous les tests
        afterEach(done => {
            usrMgr.deleteUser(user.username, done);
        });

        it("should return 201 and create user", done => {
            request(app)
                .post("/register-user")
                .send(user)
                .expect(201)
                .then(response => {
                    usrMgr.selectUser(user.username, (err, result) => {
                        expect(result.length).toEqual(1);
                        done();
                    });
                });
        });
    });

    describe("/login", () => {
        beforeAll(done => {
            usrMgr.addUser(user, done);
        });

        it("should return 201", done => {
            request(app)
                .post("/login")
                .send(user)
                .expect(201, done);
        });

        it("should return 401, user don't exist", done => {
            request(app)
                .post("/login")
                .send(wrongUser)
                .expect(401, done);
        });

        it("should return 401, user exist but wrong password", done => {
            request(app)
                .post("/login")
                .send({ username: user.username, password: wrongUser.password })
                .expect(401, done);
        });
    });

    describe("/search-games-API/:name", () => {
        it("should return search result", done => {
            request(app)
                .post("/search-games-API/monopoly")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeDefined();
                    done();
                });
        });

        it("should return no result", done => {
            request(app)
                .post("/search-games-API/sakfhksjhf")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeUndefined();
                    done();
                });
        });
    });

    describe("/get-game-info-API/:id", () => {
        it("should return search result", done => {
            request(app)
                .post("/get-game-info-API/2740") //aero Monopoly
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeDefined();
                    done();
                });
        });

        it("should return no result", done => {
            request(app)
                .post("/get-game-info-API/999999999999")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeUndefined();
                    done();
                });
        });
    });

    describe("/vote", () => {
        beforeAll(done => {
            usrMgr.addUser(user, done);
        });

        it("should return 200", done => {
            request(app)
                .post("/vote")
                .send(vote)
                .expect(200, done);
        });

        it("should create a vote in DB", done => {
            request(app)
                .post("/vote")
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

    describe("/get-collection", () => {
        it("should return 200", done => {
            request(app)
                .post("/vote")
                .send(user)
                .expect(200, done);
        });

        it("should return all keys", done => {
            request(app)
                .post("/get-collection")
                .send(user)
                .then(response => {
                    keysArr = Object.keys(response[0]);
                    excpectedArray = ["idGame", "idAPI", "name", "imgUrl"];

                    expect(keysArr).toEqual(excpectedArray);
                });
        });

        it("should return 400", done => {
            request(app)
                .post("/get-collection")
                .send(wrongUser)
                .expect(400, done);
        });
    });

    describe("/get-game-info-collection", () => {
        //TODO beforeAll add fake game in db
        //TODO afterAll remove fake game from db

        it("should return 200", done => {
            request(app)
                .post("/get-game-info-collection")
                .send(game.id)
                .expect(200, done);
        });

        it("should return all keys", done => {
            request(app)
                .post("/get-game-info-collection")
                .send(game.id)
                .then(response => {
                    keysArr = Object.keys(response);
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

    describe("/add-game-in-collection", () => {});

    describe("/modify-game-in-collection", () => {});

    describe("/delete-game-from-collection", () => {});

    describe("/create-survey", () => {});

    describe("/vote-while-logged", () => {});

    describe("/get-sharelink-survey", () => {});

    describe("/delete-user", () => {
        beforeEach(done => {
            usrMgr.addUser(user, done);
        });

        it("should return 200 and delete a user", done => {
            request(app)
                .post("/delete-user")
                .send(user)
                .expect(200)
                .then(response => {
                    usrMgr.selectUser(user.username, (err, result) => {
                        expect(result.length).toEqual(0);
                        done();
                    });
                });
        });

        it("should return 404", done => {
            request(app)
                .post("/delete-user")
                .send(wrongUser)
                .expect(404, done);
        });
    });

    afterAll(done => {
        usrMgr.deleteUser(user.username, done);
    });
});
