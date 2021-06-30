import axios from "axios";
import NextAuth, { User, Account, Profile } from "next-auth";
import Providers from "next-auth/providers";
import { RolesResponse } from "../../../types";

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
      const res = await axios.get<RolesResponse>(
        process.env.LITEBOT_URL + `members/roles/${profile.id}`
      );

      if (res.data.error) return false;
      user.roles = res.data.res;
      return true;
    }
  }
});
