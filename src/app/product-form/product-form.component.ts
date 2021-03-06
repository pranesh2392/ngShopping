import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  productObject={};
  id;

  constructor(
    private categories: CategoryService, 
    private product:ProductService, 
    private router:Router,
    private route: ActivatedRoute) {
    this.categories$ = categories.getCategories();

      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) this.product.getProductFromId(this.id).take(1).subscribe(data => this.productObject = data);
      else
        this.productObject={};

   }

  ngOnInit() {
  }

  delete()
  {
    if(!confirm('Are you sure?')) return;

    this.product.delete(this.id);
    this.router.navigateByUrl('/admin/products');
  }

  save(product)
  {
    if(this.id) this.product.update(this.id,product);
    else this.product.create(product);

    this.router.navigateByUrl('/admin/products');
  }

}