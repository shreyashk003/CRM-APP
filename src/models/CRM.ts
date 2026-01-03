import mongoose, { Schema, model, models } from "mongoose";

// --- COMPANY SCHEMA ---
const CompanySchema = new Schema({
  name: { type: String, required: true },
  industry: { type: String },
  website: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// --- CONTACT SCHEMA ---
const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Business Rule: Email must be unique within a single company
ContactSchema.index({ email: 1, company: 1 }, { unique: true });

// --- DEAL SCHEMA ---
const DealSchema = new Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { 
    type: String, 
    enum: ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"], 
    default: "New" 
  },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  contact: { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // The Sales Rep
}, { timestamps: true });

export const Company = models.Company || model("Company", CompanySchema);
export const Contact = models.Contact || model("Contact", ContactSchema);
export const Deal = models.Deal || model("Deal", DealSchema);