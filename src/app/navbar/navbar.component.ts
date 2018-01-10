import { CartService } from './../cart-service.service';
import { AppUser } from './../module/user-type';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import 'rxjs/add/operator/take';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$;
  constructor(private auth:AuthService, private cartService:CartService) {
  }

 logout()
 {
  this.auth.logout();
 }

 async ngOnInit()
 {
   this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
   
   this.cart$ = (await this.cartService.getCart())
 }

}
