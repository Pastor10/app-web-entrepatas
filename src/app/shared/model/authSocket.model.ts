export class AuthSocket {
  idUsuario: number;
  idOficina: number;
  tipoSocket: string;

  constructor(idUsuario, idOficina, tipoSocket) {
    this.idUsuario = idUsuario;
    this.idOficina = idOficina
    this.tipoSocket = tipoSocket;
  }
}
