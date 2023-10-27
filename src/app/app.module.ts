import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/productdetails/productdetails.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import {CartService} from "./services/cart.service";
import { CheckOutComponent } from './components/check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './services/form.service';

const routes :Routes = [
  {path: 'check-out', component: CheckOutComponent},
  {path: 'cart-detail', component: CartDetailComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path:'', redirectTo:'/products', pathMatch:'full'},
  {path: '**', redirectTo:'/products', pathMatch:'full'}
];

@NgModule({

  providers:[
    ProductService,
    FormService
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailComponent,
    CheckOutComponent
],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule {

}
