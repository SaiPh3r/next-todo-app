import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
    unique: true,
    sparse: true, // only enforces uniqueness on non-null values
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

