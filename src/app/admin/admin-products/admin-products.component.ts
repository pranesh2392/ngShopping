import { Product } from './../../module/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products:Product[];
  filteredProducts:any[];
  subscription:Subscription;

  constructor(private product: ProductService) {
    this.subscription = this.product.getAll().subscribe(p => this.filteredProducts = this.products = p);
   }

  filtering(query:string)
   {
     this.filteredProducts = (query)? 
      this.products.filter( p => p.name.toLowerCase().includes(query.toLowerCase())) : this.products;
   }

   ngOnDestroy()
   {
    this.subscription.unsubscribe();
   }

  ngOnInit() {
  }

}
