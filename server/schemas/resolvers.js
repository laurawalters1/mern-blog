const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");

const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const user = await User.findById(context.user._id)
        .populate("following")
        .populate({
          path: "posts",
          model: "Post",
          populate: {
            path: "postedBy",
            model: "User",
          },
        });

      return user;
    },
    getPost: async (parent, { postId }, context) => {
      const post = await Post.findById(postId);

      return post;
    },
    allPosts: async (parent, {}, context) => {
      const posts = await Post.find();

      return posts;
    },
  },
  Mutation: {
    //////////////////////////////////////
    //////////////SIGNUP///////////////////
    //////////////////////////////////////
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

    addPost: async (parent, { postText, postTitle }, context) => {
      //////////AUTH SECTION///////////////
      console.log(context.user._id);
      //////////PROCESSING/////////////////
      const post = await Post.create({
        postedBy: context.user._id,
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
        { _id: context.user._id },
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
      console.log(updatedPost);
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

    followUser: async (parent, { userId, loggedInUser }, context) => {
      //////////AUTH SECTION///////////////

      //////////PROCESSING/////////////////
      const userLoggedIn = await User.findByIdAndUpdate(
        { _id: loggedInUser },
        { $addToSet: { following: userId } },
        { new: true, runValidators: true }
      );

      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { followers: loggedInUser } },
        { new: true, runValidators: true }
      );
      //////////RETURN VALUE///////////////
      return userLoggedIn
        .populate({
          path: "following",
          model: "User",
        })
        .populate({ path: "followers", model: "User" })
        .execPopulate();
    },

    likePost: async (parent, { userId, postId }, context) => {
      const post = await Post.findByIdAndUpdate(
        { _id: postId },
        { $addToSet: { likes: userId } },
        { new: true, runValidators: true }
      );

      return post.populate({ path: "likes", model: "User" }).execPopulate();
    },

    unlikePost: async (parent, { userId, postId }, context) => {
      const post = await Post.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true, runValidators: true }
      );

      return post.populate({ path: "likes", model: "User" }).execPopulate();
    },

    unfollowUser: async (parent, { userId, loggedInUser }, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: loggedInUser },
        { $pull: { following: userId } },
        { new: true, runValidators: true }
      );

      const otherUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { followers: loggedInUser } },
        { new: true, runValidators: true }
      );

      return user
        .populate({
          path: "following",
          model: "User",
        })
        .populate({ path: "followers", model: "User" })
        .execPopulate();
    },
  },
};
module.exports = resolvers;
