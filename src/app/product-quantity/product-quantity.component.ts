import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  
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

}
