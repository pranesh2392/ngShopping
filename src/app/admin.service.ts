import { Observable } from 'rxjs/Observable';
import { AppUser } from './module/user-type';
import { AngularFireObject } from 'angularfire2/database';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuth implements CanActivate {

  role:string;
  uid:string;
  constructor(private userService: UserService,private db:AngularFireDatabase ,private auth:AuthService) { }

  canActivate(): Observable<boolean>
  {
  //   this.auth.user$.subscribe(userDetails => this.uid = userDetails.uid);
  //  return this.db.object('user/'+this.uid).valueChanges().map(user => user=user['isAdmin']);
  return this.auth.appUser$
      .map(appUser => appUser.isAdmin)
  }
}
