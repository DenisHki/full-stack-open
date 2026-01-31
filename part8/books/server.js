const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const JWT_SECRET = process.env.JWT_SECRET;

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;

      if (auth && auth.startsWith("Bearer ")) {
        const token = auth.substring(7);
        try {
          const decodedToken = jwt.verify(token, JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        } catch (error) {
          return {};
        }
      }

      return {};
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = startServer;
