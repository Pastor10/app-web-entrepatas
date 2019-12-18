import {UserResponse} from './userResponse.model';
import {Role} from './role.model';

export class LoginResponse {
  accessToken: string;
  tokenType: string;
  user: UserResponse;
  roles: Role[];
}
