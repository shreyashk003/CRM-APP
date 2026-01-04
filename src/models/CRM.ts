import mongoose, { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
  name: { type: String, required: true },
  industry: String,
  email: String,
  phone: String,
  website: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
}, { timestamps: true });

const DealSchema = new Schema({
  title: { type: String, required: true },
  value: Number,
  stage: { 
    type: String, 
    enum: ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"],
    default: "New" 
  },
  companyId: { type: Schema.Types.ObjectId, ref: "Company" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

// Explicitly naming the collections "companies", "contacts", "deals"
export const Company = models.Company || mongoose.model("Company", CompanySchema, "companies");
export const Contact = models.Contact || mongoose.model("Contact", ContactSchema, "contacts");
export const Deal = models.Deal || mongoose.model("Deal", DealSchema, "deals");