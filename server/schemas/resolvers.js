const { AuthenticationError } = require("apollo-server-express");

const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return { response: "hello" };
    },
  },
};
module.exports = resolvers;
