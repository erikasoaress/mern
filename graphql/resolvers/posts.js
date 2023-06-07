const Post = require("../../Models/Post")


module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        console.log(posts);
        return posts;
      } catch (err) {
        throw new Error("Failed to fetch posts");
      }
    },
  },
};