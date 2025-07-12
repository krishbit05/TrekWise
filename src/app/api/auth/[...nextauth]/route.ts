import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';

const prisma = new PrismaClient();

type UserWithPassword = {
  id: string;
  email: string | null;
  name?: string | null;
  password?: string | null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
      
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        }) as UserWithPassword;
      
        if (!user || !user.password) return null;
      
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
      
        return {
          id: user.id,
          email: user.email,
          name: user.name || null,
        };
      }
      ,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
  
        // If user doesn't exist in DB, create it manually
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
              // You can leave password null for OAuth users
            },
          });
        }
      }
  
      return true; // allow sign-in
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
