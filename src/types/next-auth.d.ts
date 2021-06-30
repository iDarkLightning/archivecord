import { Account as NextAccount, Profile as NextProfile } from "next-auth";
import { Role } from "../types";

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    image: string;
    roles: Role[];
  }

  interface Account extends NextAccount {}
  interface Profile extends NextProfile {}
}
