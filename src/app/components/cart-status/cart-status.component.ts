import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  
  
  totalprice : number = 0.00;
  totalquantity : number = 0;
   

  constructor( private cartService: CartService){
  }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(){
    this.cartService.totalprice.subscribe(
      data => this.totalprice = data
    )
    this.cartService.totalquantity.subscribe(
      data => this.totalquantity =data
    )
  }

}
