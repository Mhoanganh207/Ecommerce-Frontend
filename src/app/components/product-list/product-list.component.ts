import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cartitem';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{


  productlist : Product[] = [];
  currentCategoryId: number =1;
  searchmode : boolean = false;

  
    
  constructor(private productService: ProductService,
    private route: ActivatedRoute, private cartservice: CartService) { }

ngOnInit() {
this.route.paramMap.subscribe(() => {
this.listProduct();
});
}

  

  listProduct () {
    this.searchmode= this.route.snapshot.paramMap.has('keyword');
    if(this.searchmode){
      this.handleSearchProduct();
    }
    else
    this.handleListProduct();

  }
  handleSearchProduct() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    console.log(keyword);
    this.productService.getProductByKeyword(keyword).subscribe(
      data => {
        this.productlist=data;


        this.productlist= this.productlist.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      })
  }

  handleListProduct(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProducts(this.currentCategoryId).subscribe(
      data => {
        this.productlist = data;
        this.productlist= this.productlist.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
    )

  }



  addcart(product: Product) {
     const cartitem = new CartItem(product);
     this.cartservice.addToCart(cartitem);
    }

}
