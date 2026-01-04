import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/actions/db";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        // 1. Find user and explicitly include password
        const user = await User.findOne({ email: credentials.email }).select("+password");
        
        if (!user) {
          console.log(`❌ Auth Fail: ${credentials.email} not found.`);
          return null;
        }

        // 2. Compare. Remember: this FAILS if DB has plain-text "123"
        const isValid = await bcrypt.compare(
          credentials.password as string, 
          user.password
        );

        if (!isValid) {
          console.log(`❌ Auth Fail: Password mismatch for ${credentials.email}`);
          return null;
        }

        console.log(`✅ Auth Success: ${user.email} logged in as ${user.role}`);

        // 3. Return object for callbacks
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "User",
          role: user.role, 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // Ensure this is in your .env file!
  secret: process.env.NEXTAUTH_SECRET, 
});