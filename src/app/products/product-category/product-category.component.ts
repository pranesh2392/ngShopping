import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {

  category$;

  @Input() categoryParam;   

  constructor(private category:CategoryService) {
    this.category$ = this.category.getCategories();
   }

}
