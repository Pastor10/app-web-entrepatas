import {Ventanilla} from './ventanilla.model';

export class Pagination {
  content: Array<Ventanilla> = [];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;

}
