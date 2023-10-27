import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor( private httpClient : HttpClient) {

   }


   getProducts(category:number): Observable<Product[]> {
  
    const url = 'http://localhost:8080/product-category/'+category+'/products';
    return this.httpClient.get<GetResponse>(url)
    .pipe(map(response => response._embedded.products));
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>('http://localhost:8080/category')
    .pipe();
  }

  getProductByKeyword(keyword: string |null) {
    return this.httpClient.get<GetResponse>('http://localhost:8080/products/search/findByNameContaining?name='+keyword)
    .pipe(map(response => response._embedded.products));
  }

  getProductById(id: string | null) : Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/products/'+id)
   .pipe();
  }

  
}


interface GetResponse {
  _embedded:{
products:Product[]
}
}






