const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    pokemons: {
      type: [String]
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
