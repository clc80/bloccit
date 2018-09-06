const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads/";

const sequelize = require("../../src/db/models/index").sequelize;
const Ad = require("../../src/db/models").Advertisement;

describe("routes : ads", () => {
  beforeEach((done) => {
    this.ad;
    sequelize.sync({force: true}).then((res) => {
      Ad.create({
        title: "Ads",
        description: "There are a lot of them"
      })
      .then((ad) => {
        this.ad = ad;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    }); //end sequelize.sync
  }); //end beforeEach
  describe("GET /ads", () => {
    it("should return a status code 200 and all ads", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Ads");
        expect(body).toContain("There are a lot of them")
        done();
      }); //end request
    }); // end it
  }); //describe("GET /advertisement")
}); //end describe("routes : advertisement")
