import { connectDB } from "@/lib/actions/db";
import User from "@/models/User";
import { Company, Contact, Deal } from "@/models/CRM";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB();

  // 1. Clear existing data
  await User.deleteMany({});
  await Company.deleteMany({});
  await Contact.deleteMany({});
  await Deal.deleteMany({});

  // 2. Create Users (Roles: Manager and Rep) [cite: 24, 32]
  const hashedManagerPassword = await bcrypt.hash("admin123", 10);
  const hashedRepPassword = await bcrypt.hash("rep123", 10);

  const manager = await User.create({
    name: "Bimometrik Manager",
    email: "admin@crm.com",
    password: hashedManagerPassword,
    role: "manager",
  });

  const rep = await User.create({
    name: "Shreyash Rep",
    email: "shreyash@gmail.com",
    password: hashedRepPassword,
    role: "rep",
  });

  // 3. Create Companies [cite: 38]
  const company = await Company.create({
    name: "TechCorp Industries",
    website: "techcorp.com",
    industry: "Software",
    size: "50-200",
    createdBy: manager._id,
  });

  // 4. Create Contact linked to Company [cite: 51, 58]
  const contact = await Contact.create({
    name: "Alice Johnson",
    email: "alice@techcorp.com",
    phone: "123-456-7890",
    jobTitle: "CTO",
    companyId: company._id,
    createdBy: rep._id,
  });

  // 5. Create Deals (Pipeline) [cite: 62, 70]
  await Deal.create([
    {
      title: "Enterprise License",
      companyId: company._id,
      primaryContact: contact._id,
      value: 50000,
      stage: "Proposal", // Active Stage [cite: 73]
      owner: rep._id,
    },
    {
      title: "Cloud Migration",
      companyId: company._id,
      primaryContact: contact._id,
      value: 12000,
      stage: "Won", // Closed Stage [cite: 75, 82]
      owner: rep._id,
    }
  ]);

  console.log("✅ Database seeded successfully!");
  process.exit();
}

seed();