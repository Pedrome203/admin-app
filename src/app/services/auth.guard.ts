import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap(state => {
        if (!state) {
          this._router.navigate(['/login'])
        }
      })
    );
  }
  canLoad(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap(state => {
        if (!state) {
          this._router.navigate(['/login'])
        }
      })
    );
  }

}
