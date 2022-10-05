const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    posts: [Post]
    followers: [User]
    following: [User]
    _id: ID!
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
    likes: [User]
  }

  type Query {
    me: User
    getPost(postId: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): UserAuth

    loginUser(email: String!, password: String!): UserAuth

    addPost(postTitle: String!, postText: String!): Post

    deletePost(postId: ID!, userId: ID!): User

    updatePost(postId: ID!, postText: String!, postTitle: String!): Post

    followUser(userId: ID!, loggedInUser: ID!): User

    unfollowUser(userId: ID!, loggedInUser: ID!): User

    likePost(userId: ID!, postId: ID!): Post

    unlikePost(userId: ID!, postId: ID!): Post
  }
`;

module.exports = typeDefs;
