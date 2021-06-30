export interface Role {
  id: number;
  name: string;
  color: number;
}

export type RolesResponse = { error: string; res: Role[] };
