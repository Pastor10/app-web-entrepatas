import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    private _loading = false;
    public loadingStatus = new Subject();
  constructor() { }

    get loading(): boolean{
        return this._loading;
    }

    set loading(value: boolean) {  
    this._loading = value;
    this.loadingStatus.next(value);
    }

    startLoading(){
        this.loading = true;
    }

    hideLoading(){
        this.loading = false;
    }
}