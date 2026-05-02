import bcrypt from "bcryptjs";
import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  email: string;
  contact: string;
  password: string;
  fullname: string;
  role: "buyer" | "seller";
  googleId?: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: false },
  password: {
    type: String,
    required: function (this: IUser) {
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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
