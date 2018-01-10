import { Subscription } from 'rxjs/Subscription';
import { CartService } from './../cart-service.service';
import { Product } from './../module/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  category$;
  products: Product[]=[];
  filteredProducts: Product[] = [];
  categoryParam;
  cart;
  subscription:Subscription;

  constructor(
    private product:ProductService,
    private router: ActivatedRoute,
    private cartService:CartService
  ) {
    

    this.product.getAll().switchMap(data => {
      this.filteredProducts = this.products = data;
      return this.router.queryParamMap
    }) 
       .subscribe(params => {
      this.categoryParam = params.get('category');

      this.filteredProducts = (this.categoryParam) ? 
          this.products.filter(p => p.category === this.categoryParam) : this.products
    });
   }

  async  ngOnInit()
   {
     this.subscription = (await this.cartService.getCart()).subscribe(data => {
        this.cart = data
  });
   }

   ngOnDestroy()
   {
     this.subscription.unsubscribe();
   }

}