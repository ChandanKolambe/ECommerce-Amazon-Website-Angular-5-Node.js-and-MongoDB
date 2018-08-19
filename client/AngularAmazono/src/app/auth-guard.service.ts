import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  //checks if user is already logged in and if the user is logged in then redirect user to the homepage
    if (localStorage.getItem('token')) {
      return state.url.startsWith('/profile') ? true : (this.router.navigate(['/']), false);
    } else {
      return state.url.startsWith('/profile') ? (this.router.navigate(['/']), false) : true;
    }
  }

}
