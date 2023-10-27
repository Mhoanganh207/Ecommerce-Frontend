import { Injectable } from '@angular/core';
import { CartItem } from '../common/cartitem';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];
  totalprice : Subject<number> = new Subject<number>();
  totalquantity : Subject<number> = new Subject<number>();

  constructor() {
   }


   addToCart(theCartItem : CartItem){

    var alreadyExistsInCart = false;
    let existingCartItem  = undefined;

    if(this.cartItems.length > 0){
      for (var cartitem of this.cartItems){
        if(theCartItem.id === cartitem.id){
          existingCartItem = cartitem;
          break;
        }
      }

   }
   alreadyExistsInCart= (existingCartItem != undefined);
   if(alreadyExistsInCart){
    existingCartItem!.quantity++;
   }
   else{
    this.cartItems.push(theCartItem);
   }
   this.cartCompute();
  }
  cartCompute() {
    let totalpricetemp=0;
    let totalquantitytemp=0;

    for(let cartitem of this.cartItems){
      totalpricetemp += cartitem.price * cartitem.quantity;
      totalquantitytemp += cartitem.quantity;
    }

    this.totalprice.next(totalpricetemp);
    this.totalquantity.next(totalquantitytemp);
  }

  decrementQuantity(item: CartItem) {
    const id = this.cartItems.findIndex(cartitem => cartitem.id === item.id);
    this.cartItems[id].quantity--;

    if(this.cartItems[id].quantity==0){
      this.removeItem(item);
    }
    else{
    this.cartCompute();
    }
  }

  removeItem(item: CartItem) {
    const id = this.cartItems.findIndex(cartitem => cartitem.id === item.id);
    if(id > -1){
      this.cartItems.splice(id,1);
      this.cartCompute();
    }
  }
}
