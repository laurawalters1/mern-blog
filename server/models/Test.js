
const { Schema, model } = require("mongoose");

const moment = require("moment");

const testSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Test = model("Test", testSchema);

module.exports = Test;
