import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Espere...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this._authService.login(this.loginForm.value.email, this.loginForm.value.password).then(response => {
        console.log(response);
        Swal.close()
        this._router.navigate(['/']);
      })
        .catch(err => {
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
