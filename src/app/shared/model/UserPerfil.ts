import { Perfil } from './perfil.model';
import { User } from './User.model';

export interface UserPerfil{
    idUsuarioPerfil: Number;
    user: User;
    perfil: Perfil;
}