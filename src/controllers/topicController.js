const topicQueries = require("../db/queries.topics");
const Authorizer = require("../policies/topic");

module.exports = {
  index(req, res, next) {
    topicQueries.getAllTopics((err, topics) => {
      if(err) {
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        res.render("topics/index", {topics});
      }
    }) //end topicQueries.getAllTopics
  }, //end index

  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("topics/new");
    } else {
      req.flash("notice", "you are not authorized to do that. ");
      res.redirect("/topics");
    }
  }, // end new

  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();
    console.log("Creating a topic. authorized = " + authorized);
    if(authorized) {
      let newTopic = {
        title: req.body.title,
        description: req.body.description
      };
      topicQueries.addTopic(newTopic, (err, topic) => {
        if(err) {
          res.redirect(500, "/topics/new");
        } else {
          res.redirect(303, `/topics/${topic.id}`);
        }
      });//end topicQueries.addTopic
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/topics");
    }

  }, //end create

  show(req, res, next) {
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null) {
        res.redirect(404, "/");
      } else {
        res.render("topics/show", {topic});
      }
    }); //end topicQueries.getTopic
  }, //end show

  destroy(req, res, next) {
    topicQueries.deleteTopic(req, (err, topic) => {
      if(err) {
        res.redirect(err, `/topics/${req.params.id}`)
      } else {
        res.redirect(303, "/topics")
      }
    }); //end topicQueries.deleteTopic
  }, // end destroy

  edit(req, res, next) {
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null) {
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, topic).edit();

        if(authorized) {
          res.render("topics/edit", {topic});
        } else {
          req.flash("You are not authorized to do that.")
          res.redirect(`/topics/${req.params.id}`);
        }
      }
    }); //end topicQueries.getTopic
  },  //end edit

  update(req, res, next) {
    topicQueries.updateTopic(req, req.body, (err, topic) => {
      if(err || topic == null) {
        res.redirect(401, `/topics/$(req.params.id)/edit`);
      } else {
        res.redirect(`/topics/${req.params.id}`);
      }
    }); //end topicQueries.updateTopic
  } //end update
}
