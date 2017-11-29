import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  returnURL;
constructor(private userService:UserService ,private auth:AuthService, private router:Router){
this.auth.user$.subscribe(user => {
  this.returnURL = localStorage.getItem('returnURL');
  localStorage.setItem('returnURL','');
  if (user) {
    this.userService.save(user);
    this.router.navigateByUrl(this.returnURL);
  }
});  
}

}
