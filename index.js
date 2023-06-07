const {ApolloServer} = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./Models/Post");
const {MONGODB} = require("./config");

const typeDefs = gql`
type Post {
  id: ID!
  body: String!
  createdAt: String!
  username: String!
  
}
  type Query {
    getPosts:[Post]
  }
`;

const resolvers = {
  Query: {
   async getPosts(){
    try {
      const posts = await Post.find();
      console.log(posts)
      return posts;
    } catch(err) {
      throw new Error("Failed to fetch posts");
    }
   }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

try {
  mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB connected!");
      return server.listen({ port: 5000 });
    })
    .then(({ url }) => {
      console.log(`Server running at ${url}`);
    })
    .catch((err) => {
      console.error("Error starting Apollo Server:", err);
    });
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}
