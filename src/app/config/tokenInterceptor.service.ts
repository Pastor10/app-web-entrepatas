import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { LoaderRequestService } from '../shared/service/locader-request.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService, private messageService: MessageService,
                private loaderService: LoaderRequestService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let hideLoader;
        if (this.auth.getToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${this.auth.getToken()}`
                }
            });
        }

        if (!hideLoader) {
            this.showLoader();
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.onEnd();
                }
                return event;
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                this.onEnd();
                if (errorResponse && errorResponse.error && errorResponse.error['mensaje']) {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: errorResponse.error['mensaje']});
                } else {
                    if (errorResponse.error) {
                        if (errorResponse.error.message) {
                            this.messageService.add({severity: 'error', summary: 'Error', detail: errorResponse.error.message});
                        }
                        if (errorResponse.error.error === 'Unauthorized') {
                            this.router.navigateByUrl('/logout');
                        }
                    } else {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ocurrió un error'});
                    }
                }

                return throwError(errorResponse);

            }));

    }


    private onEnd(): void {
         this.hideLoader();
    }

    private showLoader(): void {
         this.loaderService.show();
    }

    private hideLoader(): void {
         this.loaderService.hide();
    }
}
