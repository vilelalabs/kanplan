import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
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