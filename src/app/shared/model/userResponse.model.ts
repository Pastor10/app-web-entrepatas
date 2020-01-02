import {Autority} from './autority.model';

export class UserResponse {
  id: number;
  username: string;
  name: string;
  authorities: Autority[];
}
