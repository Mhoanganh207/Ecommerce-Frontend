import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private httpClient: HttpClient) { 

  }

  placeOrder(purchase: Purchase) : Observable<any>{

    const url = "http://localhost:8080/purchase";
    return this.httpClient.post(url, purchase);
  }


}
