import { Product } from "./product";

export class CartItem {
    public id: number;
    public quantity: number;
    public imageUrl: string;
    public price: number;
    public name: string;

    constructor(product: Product){

        this.id = product.id;
        this.quantity = 1;
        this.imageUrl = product.imageUrl;
        this.price = product.unitPrice;
        this.name = product.name;
        this.price=product.unitPrice;

    }
}
