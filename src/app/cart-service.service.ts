import { Product } from './module/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/take";

@Injectable()
export class CartService {

  constructor(private db: AngularFireDatabase) { }

create()
{
  return this.db.list('/shopping-cart/').push({
    dateCreated:new Date().getTime()
  });
}

private getCartItem(cartId, productId)
{
  return this.db.object('/shopping-cart/' + cartId + '/items/' + productId)
}

private getCart(cartId)
{
  return this.db.object('/shopping-cart/'+cartId).valueChanges();
}

private async getOrCreateCart()
{
  let cart = localStorage.getItem('cartId');

  if (cart) return cart;

    let cartAwait = await this.create();
    localStorage.cartId=cartAwait.key;
    return cartAwait.key;
}

async addToCart(product: Product)
{
  // while getting value from async function, it will be given as promise only, so to avoid that complexity, we are getting it through async function itself

  let cartId = await this.getOrCreateCart();

  let cartItem$: AngularFireObject<{}> = this.getCartItem(cartId,product.key);

  cartItem$.valueChanges().take(1).subscribe(item => {

    if (item) cartItem$.update({ product: product, quantity: item['quantity'] + 1}) 
      else
      cartItem$.set({ product: product, quantity:1});

    // let add = (item.quantity !== null) ? item.quantity : 0;
  // cartItem$.update({ product: product, quantity: add +1});
  });  

}
}
