import { UserService } from './user.service';
import { AppUser } from './module/user-type';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  returnURL;
  user$: Observable<firebase.User>
  constructor(private userService: UserService,private afAuth:AngularFireAuth, private router:ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login()
  {
    this.returnURL=this.router.snapshot.queryParamMap.get('returnURL') || '/';
    localStorage.setItem('returnURL',this.returnURL);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout()
  {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>
  {
    return this.user$
    .switchMap(user => {
     if(user) return this.userService.get(user.uid);

     return Observable.of(null);
    })
  }

}
