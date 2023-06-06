const {ApolloServer} = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./Models/Post");
const {MONGODB} = require("./config");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!!!",
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
