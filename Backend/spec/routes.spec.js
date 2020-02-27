const request = require("supertest");
const app = require("../index");
const usrMgr = require("../model/users-management");

const user = {
    username: "testUser",
    password: "testPassword"
};

describe("Server", () => {
    describe("ROUTES TEST", () => {
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
            done(); //
        });
    });
});
