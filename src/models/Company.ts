import mongoose, { Schema, models } from "mongoose";

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    domain: { type: String }, // optional
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default models.Company || mongoose.model("Company", CompanySchema);
