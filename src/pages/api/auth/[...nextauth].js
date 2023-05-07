import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/services/prismaClient";

import { compare } from "bcryptjs";

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    callbackUrl: process.env.NEXTAUTH_URL,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) { // runs when successfully authorized
                const result = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!result) {
                    throw new Error("No user found with this email. Please sign up first.")
                }

                const isPasswordValid = await compare(credentials.password, result.password)

                if (!isPasswordValid || result.email !== credentials.email) {
                    throw new Error("Invalid credentials. Please try again.")
                }

                return result
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
})