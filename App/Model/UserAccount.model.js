import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SignupModel = new Schema({
  UserId: {
    type: Number,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Phone: {
    type: Number,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  RefreshToken: {
    type: String
  }
}, { timestamps: true });

const UserAccount = mongoose.model("AccountInfo", SignupModel);

export default UserAccount;
