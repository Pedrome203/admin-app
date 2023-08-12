import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  loading: boolean = false
  uiSubscription!: Subscription

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(ui.isLoading())
      // Swal.fire({
      //   title: 'Espere...',
      //   timer: 2000,
      //   timerProgressBar: true,
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // })
      this._authService.login(this.loginForm.value.email, this.loginForm.value.password).then(response => {

        this.store.dispatch(ui.stopLoading())
        // Swal.close()
        this._router.navigate(['/']);
      })
        .catch(err => {
          console.log(err)
          this.store.dispatch(ui.stopLoading())

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,

          })
        });
    }
  }

}
