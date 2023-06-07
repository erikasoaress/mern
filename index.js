const {ApolloServer} = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers")
const {MONGODB} = require("./config");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

try {
  mongoose
    .connect(MONGODB)
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
