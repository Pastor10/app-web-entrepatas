
import {Autority} from './autority.model';
import {Perfil} from './perfil.model';

export interface User {
id:Number;
email:string;
fullName:string;
enabled:boolean;
deleted:boolean;
type:string;
}
