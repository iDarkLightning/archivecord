import axios from "axios";
import jose from "jose";
import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Providers from "next-auth/providers";
import { GuildQueryResponse, RolesResponse } from "../../../types";

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ],
  jwt: {
    secret: process.env.JWT_SECRET
  },
  session: {
    jwt: true
  },
  callbacks: {
    async signIn(user: User, account: Account, profile: Profile) {
      const res = await axios.get<GuildQueryResponse>(
        process.env.LITEBOT_URL + `members/${profile.id}`
      );
      return res.data.error === undefined;
    },

    async session(session: Session, user: User) {
      const res = await axios.get<RolesResponse>(
        process.env.LITEBOT_URL + `members/roles/${user.sub}`,
        {
          headers: {
            Authorization: `Bearer ${jose.JWT.sign(
              {
                userID: user.sub
              },
              jose.JWK.asKey(process.env.JWT_SECRET)
            )}`
          }
        }
      );

      user.id = user.sub;
      user.roles = res.data.res;
      session.user = { ...session.user, ...user };
      return session;
    }
  }
});
