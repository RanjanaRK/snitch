import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: false },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  fullname: { type: String, required: true },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
  googleId: {
    type: String,
  },
});

// userModel.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 12);
// });

// userModel.methods.comparePassword = async function (candidatePassword: string) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("user", userModel);

export default User;
