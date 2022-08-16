import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      posts {
        postText
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
