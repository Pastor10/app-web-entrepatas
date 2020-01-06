import { Role } from "./role.model";

export class Perfil {
  idPerfil: number;
  nombre: string;
  activo: boolean;
  roles: Role[]
}
