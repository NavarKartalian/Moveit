import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      const { id, name, image } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_id'),
                  user.id
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { id, name, image, level: 1, curExp: 0, completedChallenges: 0 } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_id'),
                user.id
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.userId = token.userId
      return session
    }
  }
});