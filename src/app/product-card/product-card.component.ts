import { CartService } from './../cart-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product;

  constructor(private cartService:CartService) { }

  addToCart(product)
  {
    this.cartService.addToCart(product);
  }
}
