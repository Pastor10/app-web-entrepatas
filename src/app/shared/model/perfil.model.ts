import { Role } from "./role.model";

export class Perfil {
  id: number;
  nombre: string;
  activo: boolean;
  roles: Role[]
}
