import { Injectable } from '@angular/core';
// import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
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
    console.log('cek sesi login');
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        console.log('autologin.guard isAuth : ' + isAuthenticated);
        if (isAuthenticated) {
          console.log('Ada sesi login, redirect ke contact');
          // Jika ada sesi login
          this.router.navigateByUrl('/contact', { replaceUrl: true });
        } else {
          console.log('tidak ada sesi login');
          return true;
        }
      })
    );
  }
}
