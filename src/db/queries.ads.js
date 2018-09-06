const Ad = require("./models").Advertisement;

module.exports = {
  getAllAds(callback){
    return Ad.all()
    .then((ads) => {
      callback(null, ads);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
