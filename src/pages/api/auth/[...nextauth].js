import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@/services/prismaClient";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET
        })
    ]

})