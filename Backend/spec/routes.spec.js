const request = require("supertest");
const app = require("../index");

describe("Server", () => {
    describe("ROUTES TEST", () => {
        it("should add a user", done => {
            const user = {
                username: "Bastian",
                password: "pro"
            };
            request(app)
                .post("/register-user")
                .send(user)
                .expect(201, done);
        });
    });
});
