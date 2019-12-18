import {Video} from './video.model';

export class ListaVideoVideo {
  numOrden: number;
  video: Video;

  constructor(numOrden, video) {
    this.numOrden = numOrden;
    this.video = video;
  }
}
