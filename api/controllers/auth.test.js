import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
const should = chai.should();

chai.use(chaiHttp);

//auth.controller.js
describe("Auth Controller", () => {
  it("Attempt to create a new client", (done) => {
    const user = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "password",
      accountType: "client",
    };

    chai
      .request(server)
      .post("/api/auth/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("User created successfully");
        done();
      });
  });
});
