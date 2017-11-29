import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private route:Router) { }

  canActivate(route, state: RouterStateSnapshot)
  {
     return this.auth.user$.map(user => {
       if(user) return true;

       this.route.navigate(['/login'],{queryParams:{returnURL:state.url}})
        .then((nav) => console.log(nav));
        return false;
     })
  }

}
