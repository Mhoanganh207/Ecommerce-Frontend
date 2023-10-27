import { CartItem } from "./cartitem"

export class Item {
    public unitPrice: number
        public quantity: number
         public productID: number
    constructor(cartItem: CartItem) {

        this.unitPrice= cartItem.price;
        this.quantity= cartItem.quantity;
        this.productID= cartItem.id;

    }
}
