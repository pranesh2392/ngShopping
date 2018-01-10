import { CartService } from './../cart-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product;
  @Input() shoppingCart;

  constructor(private cartService:CartService) { }

  addToCart()
  {
    this.cartService.addToCart(this.product);
  }

  removeFromCart()
  {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity()
  {
    if (!this.shoppingCart) return 0;
    let quantity = this.shoppingCart.itemsMap[this.product.key].quantity;
    return (quantity) ? quantity : 0;

  }
}
