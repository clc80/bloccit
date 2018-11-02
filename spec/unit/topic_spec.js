const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;


describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
      })
      .then((topic) => {
        this.topic = topic;
        this.post = topic.posts[0];
        done();
      })
    })
    }); //end sequelize.sync
  }); //end before beforeEach

  describe("#create()", () => {
    it("should create a Topic object with a title, and description", (done) => {
      Topic.create({
        title: "How to fly an airplane",
        description: "1. Do a preflight.",
      }) //end Topic.create
      .then((topic) => {
        expect(topic.title).toBe("How to fly an airplane");
        expect(topic.description).toBe("1. Do a preflight.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    }); //end it
    it("should not create topic with invalid attributes", (done) => {
      Topic.create({
        title: "This will not show up"
      })
      .then((topic) => {
        //if this happens then it failed
        expect(true).toBe(false);
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    }); //end it
  }); //end describe("#create()")

  describe("#getPosts()", () => {
    it("should return associated posts", (done) => {
      this.topic.getPosts()
      .then((posts) => {
        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe(this.post.title);
        expect(posts[0].body).toBe(this.post.body);
        expect(posts[0].id).toBe(this.post.id);
        done();
      })
    })
  });
}); //end describe("Topic")
