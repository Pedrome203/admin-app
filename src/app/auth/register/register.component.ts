import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  createUser() {
    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Espere...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      const { name, email, password } = this.registerForm.value
      this._authService.createUser(name, email, password).then(response => {
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
