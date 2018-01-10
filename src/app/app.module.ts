import { CartService } from './cart-service.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuth } from './admin.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomFormsModule } from 'ng2-validation';

import { RouterModule, Routes, Route } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductCategoryComponent } from './products/product-category/product-category.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

const route:Routes = [
  {
    path:'',
    component:ProductsComponent
  },
  {
    path:'shopping-cart',
    component:ShoppingCartComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path: 'myorders',
    component: MyOrdersComponent
  },
  {
    path:'check-out',
    component:CheckOutComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'my/ordersuccess',
    component:OrderSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin/products/:id',
    component:ProductFormComponent,
    canActivate: [AuthGuard,AdminAuth]
  },
  {
    path:'admin/products/new',
    component:ProductFormComponent,
    canActivate: [AuthGuard,AdminAuth]
  },
  {
    path:'admin/products',
    component:AdminProductsComponent,
    canActivate: [AuthGuard,AdminAuth]
  },
  {
    path:'admin/orders',
    component:AdminOrdersComponent,
    canActivate: [AuthGuard,AdminAuth]
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCategoryComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    RouterModule.forRoot(route),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuth,
    CategoryService,
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
