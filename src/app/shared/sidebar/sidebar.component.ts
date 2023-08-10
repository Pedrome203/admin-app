import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  public name: string = ''
  private userSubs!: Subscription
  constructor(private store: Store<AppState>, private _authService: AuthService, private _router: Router) { }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.name = user! ? user!.name : ''
    })
  }

  logout() {
    Swal.fire({
      title: 'Espere...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    this._authService.logout().then(() => {
      Swal.close()
      this._router.navigate(['/login']);
    }).catch(err => {
      console.log(err)
    })
  }
}
