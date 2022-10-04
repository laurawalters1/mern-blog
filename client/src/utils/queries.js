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
