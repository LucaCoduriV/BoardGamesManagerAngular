var colors = require("colors");
const request = require("supertest");
const app = require("../index");
const usrMgr = require("../model/users-management");
const DB = require("../model/db");

const user = {
    username: "testUser",
    password: "testPassword"
};

const fakeUser = {
    username: "fakeUser",
    password: "fakePassword"
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

        it("should return 201", done => {
            request(app)
                .post("/register-user")
                .send(user)
                .expect(201, done);
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
                .send(fakeUser)
                .expect(401, done);
        });

        it("should return 401, user exist but wrong password", done => {
            request(app)
                .post("/login")
                .send({ username: user.username, password: fakeUser.password })
                .expect(401, done);
        });
    });

    describe("/search-games-API/:name", () => {
        it("should return defined item", done => {
            request(app)
                .post("/search-games-API/monopoly")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeDefined();
                    done();
                });
        });

        it("should return defined item", done => {
            request(app)
                .post("/search-games-API/sakfhksjhf")
                .expect(200)
                .then(response => {
                    expect(response.body.item).toBeUndefined();
                    done();
                });
        });
    });

    afterAll(done => {
        usrMgr.deleteUser(user.username, done);
    });
});
