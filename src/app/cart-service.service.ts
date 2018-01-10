import { Observable } from 'rxjs/Observable';
import { ShoppingCartItem } from './module/shopping-cart-item';
import { Product } from './module/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { ShoppingCart } from "./module/shopping-cart";

interface Cart  {
  items:Product,
  quantity: number
} 

@Injectable()
export class CartService {

  constructor(private db: AngularFireDatabase) { }

create()
{
  return this.db.list('/shopping-cart/').push({
    dateCreated:new Date().getTime()
  });
}

private getCartItem(cartId, productId):AngularFireObject<ShoppingCartItem>
{
  return this.db.object('/shopping-cart/' + cartId + '/items/' + productId)
}

  async getCart(): Promise<Observable<ShoppingCart>>
{
  let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-cart/'+cartId).valueChanges().map(x => {
   return  new ShoppingCart(x['items'])
  });
}

private async getOrCreateCartId()
{
  let cart = localStorage.getItem('cartId');

  if (cart) return cart;
  
  let cartAwait = await this.create();
    localStorage.cartId=cartAwait.key;
    return cartAwait.key;
}

addToCart(product: Product)
{
  this.changeQuantity(product,  1);
}

removeFromCart(product:Product)
{
  this.changeQuantity(product,-1);
}

async changeQuantity(product:Product, change:number)
{
  // while getting value from async function, it will be given as promise only, so to avoid that complexity, we are getting it through async function itself
  let cartId = await this.getOrCreateCartId();
  let cartItem$: AngularFireObject<ShoppingCartItem> = this.getCartItem(cartId, product.key);
  cartItem$.valueChanges().take(1).subscribe(item => {

    if (item) cartItem$.update({ product: product, quantity: item.quantity + change })
    else
      cartItem$.set({ product: product, quantity: 1 });
  });
}


}
