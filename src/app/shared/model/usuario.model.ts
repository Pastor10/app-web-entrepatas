
import {Autority} from './autority.model';
import {Perfil} from './perfil.model';

export class Usuario {
  idUsuario: number;
  nombre: string;
  dni: string;
  username: string;
  passwordTrans: string;
  fechaIngreso: Date;
  apePaterno: string;
  apeMaterno: string;
  ultFecModif: Date;
  visible: boolean;
  perfil: Perfil;
  roles: Autority[];
}
