import { AppUser } from './../module/user-type';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
// import 'rxjs/add/operator/take';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appUser: AppUser;
  constructor(private auth:AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser=appUser);
  }

 logout()
 {
  this.auth.logout();
 }





}
