import { Address } from "./address";
import { Customer } from "./customer";
import { Item } from "./item";
import { Order } from "./order";

export class Purchase {

    customer : Customer;
    address : Address;
    order : Order;
    products: Item[];

}
