import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories()
  {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

}
