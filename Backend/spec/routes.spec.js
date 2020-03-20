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
    id: 2,
    idUser: 10,
    idCandidate: 10
};

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjEsInVzZXJuYW1lIjoibHVjYSIsInN1cGVyYWRtaW4iOjEsImlhdCI6MTU4NDYzMjU2NH0.sw8h5DFMC9ZZGYPOSZP-T2IsLhLwDPpiAN6JOcad9nk";

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
    //Register DONE
    describe("/users", () => {
        //supprimer l'utilisateur de test avant tous les tests
        beforeEach(done => {
            DB.pool.query(`DELETE FROM users WHERE (login = '${user.username}');`, done);
        });

        it("should return 201", done => {
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

    //Login DONE
    describe("/login", () => {
        //ajoute un utilisateur avant tous les tests
        beforeAll(done => {
            usrMgr.addUser(user, done);
        });

        it("should return 201", done => {
            request(app)
                .post("/login")
                .set("token", token)
                .send(user)
                .expect(201, done);
        });

        it("should return 401, user don't exist", done => {
            request(app)
                .post("/login")
                .set("token", token)
                .send(wrongUser)
                .expect(401, done);
        });

        it("should return 401, user exist but wrong password", done => {
            request(app)
                .post("/login")
                .set("token", token)
                .send({ username: user.username, password: wrongUser.password })
                .expect(401, done);
        });
    });

    //recherche DONE
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

    //info à propos d'un jeu DONE
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
    //TODO supprimer les votes apres chaque test
    describe("/users/:idUser/surveys/:idSurvey/vote", () => {
        //ajoute un utilisateur avant tous les test

        it("should return 200", done => {
            request(app)
                .post("/users/1/surveys/4/candidates/2/vote")
                .expect(200)
                .then(result => {
                    console.log(result + "".green);
                    done();
                });
        });
        afterEach(done => {
            DB.pool.query(`DELETE FROM votes WHERE idCandidate = '2' AND idUser = '1'`, (err, result) => {
                done();
            });
        });
    });

    //get collection
    describe("/users/:idUser/games", () => {
        it("should return 201", done => {
            request(app)
                .post(`/users/${user.id}/games`)
                .set("token", token)
                .send(user)
                .expect(201, done);
        });
    });

    //ajouter un jeu dans la collection
    describe("/users/:idUser/games", () => {
        //aucun jeu n'est fourni
        it("should return 400", done => {
            request(app)
                .post(`/users/${user.id}/games`)
                .expect(400, done);
        });
    });

    //supprimer un utilisateur
    describe("/users/:idUser", () => {
        beforeEach(done => {
            DB.pool.query(`INSERT INTO users(idUser, login, password) values(${user.id}, '${user.username}', '${user.password}');`, done);
        });

        it("should return 200", done => {
            request(app)
                .delete(`/users/${user.id}`)
                .set("token", token)
                .expect(200, done);
        });

        it("should return 400", done => {
            request(app)
                .delete(`/users/${wrongUser.id}`)
                .send(wrongUser)
                .expect(400, done);
        });
    });

    afterAll(done => {
        DB.pool.query(`DELETE FROM users WHERE (login = '${user.username}');`, done);
    });
});
