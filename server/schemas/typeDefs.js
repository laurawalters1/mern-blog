const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    response: String!
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;
