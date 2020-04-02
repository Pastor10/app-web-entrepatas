import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';



@Injectable()
export class LoaderInterceptor  implements HttpInterceptor{
    activeRequests =0;

    constructor (private loaderService: LoaderService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.activeRequests === 0){
            this.loaderService.startLoading();
        }
        this.activeRequests ++;
        return next.handle(request).pipe(
            finalize(()=>{
                this.activeRequests--;
                if(this.activeRequests === 0){
                    this.loaderService.hideLoading();
                }
            })
        );
    }
}