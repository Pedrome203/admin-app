import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
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
