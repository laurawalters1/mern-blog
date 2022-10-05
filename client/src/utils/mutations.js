import { gql } from "@apollo/client";

// TODO - add authentication token here

// sign up user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation deletePost($postTitle: String!, $postText: String!) {
    addPost(postTitle: $postTitle, postText: $postText) {
      _id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postTitle: String!, $postText: String!, $postId: ID!) {
    updatePost(postTitle: $postTitle, postText: $postText, postId: $postId) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!, $userId: ID!) {
    deletePost(postId: $postId, userId: $userId) {
      username
    }
  }
`;
