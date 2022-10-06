import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      posts {
        _id
        postText
        postTitle
        postedBy {
          username
          _id
        }
      }
      followers {
        _id
        username
      }
      following {
        _id
        username
      }
    }
  }
`;

export const ALL_POSTS = gql`
  query AllPosts {
    allPosts {
      _id
      postTitle
      postText
      postedBy {
        username
        _id
      }
      createdAt
    }
  }
`;
