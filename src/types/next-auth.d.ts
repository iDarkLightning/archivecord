import {
  Account as NextAccount,
  Profile as NextProfile,
  Session as NextSession
} from "next-auth";
import { Role } from "../types";

declare module "next-auth" {
  interface Session extends NextSession {
    user: User;
  }

  interface User {
    name: string;
    sub: string;
    id: string;
    email: string;
    image: string;
    roles: Role[];
    token: JWT | undefined;
  }

  interface Account extends NextAccount {}
  interface Profile extends NextProfile {
    id: string;
  }
}
