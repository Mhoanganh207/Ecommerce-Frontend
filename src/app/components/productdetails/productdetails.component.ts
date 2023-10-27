import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cartitem';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent  implements OnInit {

  product! : Product ;
  constructor(private productService: ProductService, private route: ActivatedRoute,
     private cartservice : CartService){}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    var id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe(
      data => {
        console.log(data);
        this.product=data;}
    )
  }

  addtoCart(product: Product) {
       const cartitem = new CartItem(product);
       this.cartservice.addToCart(cartitem);
    }
}
