// import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
// import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // kode default
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return true;
  // }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        console.log('auth.guard isAuth : ' + isAuthenticated);
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/');
          console.log('Anda harus login dulu');
          return false;
        }
      })
    );
  }
}
