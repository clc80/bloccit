const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {
  getAllTopics(callback){
    return Topic.all()

    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  }, //end getAllTopics(callback)

  getTopic(id, callback) {
    //return Topic.findById(id)
    return Topic.findById(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((topic) => {
      callback(null,topic);
    })
    .catch((err) => {
      callback(err);
    })
  }, // end getTopic(id, callback)

  addTopic(newTopic, callback){
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  }, // end addTopic(newTopic, callback);

  deleteTopic(id, callback){
    return Topic.destroy({
      where: {id}
    }) //end return
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },  // end deleteTopic

  updateTopic(id, updatedTopic, callback) {
    return Topic.findById(id)
    .then((topic) => {
      if(!topic) {
        return callback("Topic not found");
      }
      topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  } //updateTopic
}
