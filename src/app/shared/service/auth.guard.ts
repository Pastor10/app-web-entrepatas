import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log("SESION LOCALSTORAGE"+localStorage.getItem('token'));
      if (!localStorage.getItem('token')) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
  }
}
