import { Observable } from 'rxjs/Observable';
import { AppUser } from './module/user-type';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import * as firebase from 'firebase/app'
@Injectable()
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user: firebase.User)
  {
    this.db.object('/user/'+user.uid).update({
      name:user.displayName,
      email:user.email,
      photoURL: user.photoURL
    });
  }

  get(uid: string): Observable<AppUser>
  {
    return this.db.object('user/'+uid).valueChanges();
  }
}
