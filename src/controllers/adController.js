const adQueries = require("../db/queries.ads.js");

module.exports = {
  index(req, res, next) {

    adQueries.getAllAds((err, ads) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("ads/index", {ads});
      }
    })// end adQueries.getAllads
  }, //end index

  new(req, res, next) {
    res.render("ads/new");
  },  // end new

  create(req, res, next){
    let newAd = {
      title: req.body.title,
      description: req.body.description
    };
    adQueries.addAd(newAd, (err, ad) => {
      if(err){
        res.redirect(500, "/ads/new");
      } else {
        res.redirect(303, `/ads/${ad.id}`);
      }
    });
  }, //end create

  show(req, res, next){
    adQueries.getAd(req.params.id, (err, ad) => {
      if(err || ad == null){
        res.redirect(404, "/");
      } else {
        res.render("ads/show", {ad});
      }
    }); //end getAd
  },  //end show

  destroy(req, res, next) {
    adQueries.deleteAd(req.params.id, (err, ad) => {
      if(err) {
        res.redirect(500, `/ads/${ad.id}`)
      } else {
        res.redirect(303, "/ads")
      }
    }); //deleteAd
  }, //end destroy

  edit(req, res, next) {
    adQueries.getAd(req.params.id, (err, ad) => {
      if(err || ad == null) {
        res.redirect(404, "/");
      } else {
        res.render("ads/edit", {ad});
      }
    }); //end getAd
  },  //end edit

  update(req, res, next){
     adQueries.updateAd(req.params.id, req.body, (err, ad) => {

       if(err || ad == null){
         res.redirect(404, `/ads/${req.params.id}/edit`);
       } else {
         res.redirect(`/ads/${ad.id}`);
       }
     });
   } //end update
}
