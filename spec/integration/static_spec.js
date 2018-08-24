const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    }); //end of it

  }); // end of describe("GET /")

  describe("GET /marco", () => {
    it("should return status code 200 and 'polo'", (done) => {
      request.get("http://localhost:3000/marco", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toBe("polo");
        done();
      });
    }); //end of it

  });//end of describe("GET /marco")

});
