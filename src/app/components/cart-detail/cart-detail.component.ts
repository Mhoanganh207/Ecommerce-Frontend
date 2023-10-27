import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cartitem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent  implements OnInit{
   cartItems : CartItem[] = [];
   Price : number =0;
   Quantity : number = 0;

   constructor(private cartService:CartService) {
    
   }
  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){

    this.cartItems= this.cartService.cartItems;

    
    this.cartService.totalprice.subscribe(
      data => this.Price = data
      
    )
    
    this.cartService.totalquantity.subscribe(
      data => this.Quantity = data)

    this.cartService.cartCompute();



   
  }

  plusItem(item: CartItem) {
    this.cartService.addToCart(item);
    }

    minusItem(item: CartItem) {
      this.cartService.decrementQuantity(item);
      }
   remove(item: CartItem) {
        this.cartService.removeItem(item);
        }


}
