const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }

  type UserAuth {
    token: ID!
    user: User
  }

  type Comment {
    _id: ID!
    postId: ID!
    userId: ID!
    commentText: String!
  }

  type Post {
    _id: ID!
    postTitle: String
    postedBy: User!
    postText: String!
    createdAt: String
    comments: [Comment]
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): UserAuth

    loginUser(email: String!, password: String!): UserAuth

    addPost(postTitle: String!, userId: ID!, postText: String!): Post
  }
`;

module.exports = typeDefs;
