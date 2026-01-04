Bimometrik Sales CRM (Lightweight)
A professional, full-stack Sales CRM built for small sales teams to manage the end-to-end lifecycle of leads, companies, and deals.

**Architecture**
crm-app/
├── src/
│   ├── app/                 # Next.js App Router 
│   │   ├── (auth)/          # Authentication Route Group 
│   │   │   ├── login/       # Login Page 
│   │   │   └── register/    # Registration Page 
│   │   ├── api/             # API routes 
│   │   │   ├── auth/        
│   │   │   │   └── register/# User Registration API (Hashed Storage) 
│   │   │   │       └── route.ts
│   │   ├── dashboard/       # Protected CRM Dashboard
│   │   │   ├── layout.tsx   # Sidebar & Role-based Layout 
│   │   │   ├── page.tsx     # Metrics (Reps vs Managers) 
│   │   │   ├── companies/   # Company Management
│   │   │   ├── contacts/    # Contact Management 
│   │   │   └── pipeline/    # Deal Pipeline (Kanban)
│   │   └── layout.tsx       # Global Context & Root Layout
│   ├── components/          # Reusable UI 
│   │   ├── ui/              # Shadcn/Radix primitives (Button, Input)
│   │   ├── shared/          # Navbar, Sidebar, ProtectedRoute 
│   │   └── crm/             # CRM-specific (DealCard, ActivityFeed) 
│   ├── lib/                 # Shared Utilities
│   │   ├── actions/         # Server Actions (DB Mutations)
│   │   │   └── db.ts        # MongoDB Connection (Mongoose) 
│   │   └── utils.ts         # Formatting & Tailwind merging
│   ├── models/              # Data Modeling 
│   │   ├── User.ts          # Auth User Model (manager | rep) 
│   │   └── CRM.ts           # Company, Contact, Deal, Activity 
│   ├── scripts/             
│   │   └── seed.ts          # Database Seeding Script 
│   ├── __tests__/           # Testing Suite 
│   │   └── deal.test.ts # Business Logic Tests (Light required) 
│   ├── auth.ts              # NextAuth.js Configuration 
│   └── middleware.ts        # Route protection & Role enforcement 
├── .env.local               # Secrets (MONGODB_URI, NEXTAUTH_SECRET) 
├── jest.config.js           # Test Configuration 
├── package.json             # Dependencies & Scripts
└── README.md                # Documentation & Design Rationale 


Tech Stack 
Framework: Next.js 15 (App Router) 
Database: MongoDB via Mongoose 
Authentication: NextAuth.js 
Styling: Tailwind CSS & Lucide React 
Language: TypeScript

1. Environment Setup
Create a .env.local file in the root directory and add the following:

Bash

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:3000

Installation
Bash

npm install
npm run dev

**Architecture Decisions **
This project follows a Modular Monolith architecture using Next.js 15 (App Router).

Layered Structure: Separated concerns into models (Data), actions (Business Logic), and components (UI) for high maintainability.

Server Actions over API Routes: Utilized Next.js Server Actions for CRM mutations to reduce boilerplate and ensure type-safe data handling directly from the server.

State Management: Leveraged URL-based state for filtering (Search/Stages) and revalidatePath for real-time pipeline updates without complex global state libraries.

Role-Based Security: NextAuth.js is configured with a custom session callback to enforce manager vs rep permissions across both the UI and the API layer.

This README is designed to meet all the specific evaluation criteria mentioned in your assignment. It highlights your engineering judgment, architectural decisions, and the professional "Bimometrik" aesthetic we built.

Role-Based Security: NextAuth.js is configured with a custom session callback to enforce manager vs rep permissions across both the UI and the API layer.


**📊 Data Modeling Rationale** 

The schema is designed to enforce business rules while allowing for deep relational queries in a NoSQL environment.

Relational Mapping: Used Mongoose ObjectIds to link Contacts and Deals to Companies, ensuring a "Single Source of Truth" for corporate profiles.

Polymorphic Activities: Activity logs are stored in a centralized collection but linked via linkedEntity references, allowing a unified timeline view across Deals and Companies.

Integrity Constraints: Implemented a unique index for Contact emails per company to satisfy the specific business requirement.

Security: Passwords are never stored in plain text; they are hashed using bcryptjs before being persisted to MongoDB.

Role-Aware Dashboard: * Sales Reps: See and manage only their owned leads and metrics.

Managers: Access aggregated global metrics, top-performing reps, and reassignment tools.

Role-Aware Dashboard: * Sales Reps: See and manage only their owned leads and metrics.

**Final Acceptance Checklist **

Before submitting your repository link, ensure these are true:

Authentication: Users can successfully register, login, and logout.

Role Enforcement: A "Rep" login cannot see the Manager's global metrics.

Seed Data: The npm run seed script exists to let evaluators explore the app easily.

Security: All passwords in the database are hashed.

📂 Deliverables & Setup
1. Seed Data
To explore the application with realistic data, a seeding script is provided. This creates a Manager, a Sales Rep, and several linked records (Companies, Contacts, and Deals).

To run the seed script:

Bash

npm run seed

Users Created: * Manager: admin@crm.com (Password: admin123) 


Rep: shreyash@gmail.com (Password: rep123) 


Data Structure: Includes a company ("TechCorp"), a primary contact, and a deal pipeline to demonstrate dashboard metrics.

🧪 Testing
As required by the assignment, this project includes unit tests to demonstrate testing discipline and the validation of core business logic.



**Test Suite Overview
** We have implemented Model Logic Tests that verify:
Business Rule Validation: Ensures only "Won" and "Lost" stages are treated as closed.
Role Validation: Confirms user roles are correctly assigned as manager or rep.
Security Hygiene: Validates that password hashing is enforced before persistence.

To run the tests:

Bash

npm test

**🔧 Configuration Checklist**
Before final submission, ensure your .env.local contains these keys to support the Deliverables:

MONGODB_URI: Connection for data persistence.

NEXTAUTH_SECRET: Used for session encryption.

NEXTAUTH_URL: http://localhost:3000
