const request = require("supertest");
const app = require("../index");
const usrMgr = require("../model/users-management");

const user = {
    username: "testUser",
    password: "testPassword"
};

describe("Server", () => {
    describe("ROUTES TEST", () => {
        //supprimer l'utilisateur de test avant tous les tests
        beforeAll(done => {
            usrMgr.deleteUser(user.username, done);
        });

        it("should add a user", done => {
            request(app)
                .post("/register-user")
                .send(user)
                .expect(201, done);
        });

        it("should check user password", done => {
            request(app)
                .post("/login")
                .send(user)
                .expect(201, done);
        });
    });
});
