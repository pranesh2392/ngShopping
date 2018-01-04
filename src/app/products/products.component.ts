import { Product } from './../module/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  category$;
  products: Product[]=[];
  filteredProducts: Product[] = [];
  categoryParam;

  constructor(
    private product:ProductService,
    private router: ActivatedRoute
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
}
