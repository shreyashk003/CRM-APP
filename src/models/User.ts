// src/models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["rep", "manager"], 
    default: "rep" 
  },
  // REMOVE 'required: true' from here, or remove the line entirely
  companyId: { type: Schema.Types.ObjectId, ref: "Company" }, 
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;