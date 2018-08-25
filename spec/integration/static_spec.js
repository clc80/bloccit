const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");
        done();
      });
    }); //end of it

  }); // end of describe("GET /")
  describe("GET /about", () => {
    it("should return status code 200 and have 'About Us' in the body of the response", (done) => {
      request.get("http://localhost:3000/about", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toBe("About Us");
        done();
      });
    }); //end of it

  }); // end of describe("GET /")

});
