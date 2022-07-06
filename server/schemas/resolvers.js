const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");

const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return { response: "hello" };
    },
    getPost: async (parent, { postId }, context) => {
      const post = await Post.findById(postId);

      return post;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // generate token
      const token = signToken(user);
      return { token, user };
    },

    //////////////////////////////////////
    //////////////LOGIN///////////////////
    //////////////////////////////////////

    loginUser: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);

      return { token, user };
    },

    addPost: async (parent, { postText, postTitle, userId }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user can create posts (i.e not company or admin)

      //////////PROCESSING/////////////////
      const post = await Post.create({
        postedBy: userId,
        postText,
        postTitle,
      });

      const updatedPost = await Post.findById({
        _id: post._id,
      }).populate({
        path: "postedBy",
        model: "User",
      });

      // add to the users posts array
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            posts: post._id,
          },
        },
        { new: true, runValidators: true }
      ).populate({
        path: "posts",
        model: "Post",
      });

      //////////RETURN VALUE///////////////

      return updatedPost;
    },

    deletePost: async (parent, { postId, userId }, context) => {
      const deletedPost = await Post.findByIdAndDelete({ _id: postId });

      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { posts: postId } },
        { new: true, runValidators: true }
      ).populate({
        path: "posts",
        model: "Post",
      });

      return user;
    },
    updatePost: async (parent, { postId, postText, postTitle }, context) => {
      const post = Post.findByIdAndUpdate(
        { _id: postId },
        { postText, postTitle },
        { new: true, runValidators: true }
      );

      return post;
    },
  },
};
module.exports = resolvers;
