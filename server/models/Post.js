const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const moment = require("moment");

const postSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postTitle: {
      type: String,
    },
    postText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a'),
    },
    comments: [commentSchema],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// comment count
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
