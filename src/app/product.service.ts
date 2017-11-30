import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product)
  {
    this.db.list("/products/").push(product);
  }

  update(productId, product)
  {
    this.db.object('/products/'+productId).update(product);
  }

  getAll()
 {
   return this.db.list('/products').snapshotChanges().map(data => {
     return data.map(c => ({key: c.payload.key, ...c.payload.val()}));
   });
 }
 
 getProductFromId(id)
 {
   return this.db.object('/products/'+id).valueChanges();
 }
}