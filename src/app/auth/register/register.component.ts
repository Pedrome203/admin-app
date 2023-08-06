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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  uiSubscription!: Subscription
  registerForm!: FormGroup
  loading: boolean = false

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  createUser() {
    if (this.registerForm.valid) {
      this.store.dispatch(ui.isLoading())
      // Swal.fire({
      //   title: 'Espere...',
      //   timer: 2000,
      //   timerProgressBar: true,
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // })
      const { name, email, password } = this.registerForm.value
      this._authService.createUser(name, email, password).then(response => {
        console.log(response);
        this.store.dispatch(ui.stopLoading())
        // Swal.close()
        this._router.navigate(['/']);
      })
        .catch(err => {
          this.store.dispatch(ui.stopLoading())
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,

          })
        });
    }
  }

}
