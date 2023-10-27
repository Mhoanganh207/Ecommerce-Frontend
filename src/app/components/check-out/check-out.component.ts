import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Item } from 'src/app/common/item';
import { Order } from 'src/app/common/order';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckOutService } from 'src/app/services/check-out.service';
import { FormService } from 'src/app/services/form.service';
import { FormValidator } from 'src/app/validators/form-validator';

declare var step1 : any;
declare var step2 : any;
declare var step3 : any;
declare var backstep3 : any;
declare var backstep2 : any;
declare var backstep1 : any;


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckOutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;

  progress! : number;

  totalquantity: number =0;

  totalprice: number =0.00;


  countries : Country[] = [];

  states : State[] = [];



  constructor(private formbuilder: FormBuilder, private cartservice: CartService,
     private formservice: FormService,
     private checkoutservice: CheckOutService,
     private router : Router){}

  ngOnInit(): void {


    this.progress =0;
    this.cartservice.totalprice.subscribe(
      data => {
        this.totalprice = data
      }

    )
    this.cartservice.totalquantity.subscribe(
      data => this.totalquantity = data

    )
    this.cartservice.cartCompute();
    this.checkoutFormGroup = this.formbuilder.group({

              customer: this.formbuilder.group({
                firstName: new FormControl('', [Validators.required, Validators.minLength(2),FormValidator.whitespaceValidator]),
                lastName:  new FormControl('', [Validators.required, Validators.minLength(2),FormValidator.whitespaceValidator]),
                email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
              }),

              address: this.formbuilder.group({
                country :[''],
                state : [''],
                city : new FormControl('', [Validators.required, Validators.minLength(2)]),
                street : new FormControl('', [Validators.required, Validators.minLength(2)])
              }),

              payment: this.formbuilder.group({
                cardtype :[''],
                cardname : [''],
                cardnumber : [''],
                validdate : [''],
                cardcode :['']
              })


    });


    this.formservice.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )


  }
  onSubmit(): void {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }


  }

  purchase() {
    if(this.progress ===4){

      let order: Order = new Order(this.totalprice, this.totalquantity);

      let itemlist : Item[] = this.cartservice.cartItems.map(tempCartItem => new Item(tempCartItem));


      let purchase : Purchase = new Purchase();

      purchase.customer = this.checkoutFormGroup.controls['customer'].value;

      console.log(purchase.customer);

      purchase.address = this.checkoutFormGroup.controls['address'].value;
      const country: Country = JSON.parse(JSON.stringify(purchase.address.country));
      const state: State = JSON.parse(JSON.stringify(purchase.address.state));
      purchase.address.country = country.name;
      purchase.address.state = state.name;


      purchase.order = order;
      purchase.products = itemlist;


      this.checkoutservice.placeOrder(purchase).subscribe(
        {
          next : response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
          this.router.navigateByUrl("/products");
          this.resetCart();
          },
         error : err => {
           alert(`There was an error: ${err.message}`);
           }

          }

      )
      }
    }
  resetCart() {
    this.cartservice.cartItems = [];
    this.cartservice.totalprice.next(0);
    this.cartservice.totalquantity.next(0);
    this.checkoutFormGroup.reset();
    this.progress =0;
  }

  get firstName() {
   return this.checkoutFormGroup.get('customer.firstName') ;
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName') ;
   }
  get email() {
    return this.checkoutFormGroup.get('customer.email') ;
   }
  get city(){
    return this.checkoutFormGroup.get('address.city');
  }
  get street(){
    return this.checkoutFormGroup.get('address.street');
  }

  getStates() {
    const formgroup = this.checkoutFormGroup.get('address');
    const countryid = formgroup?.value.country.id;
    this.formservice.getStates(countryid).subscribe(
      data => {
        this.states = data;
        this.states = this.states.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        formgroup?.get('state')?.setValue(data[0]);
      }
    )
    }

   next(){
    if(this.progress !==4){
    this.progress++;
    }
    if(this.progress==1){
      new step1();
    }
    if(this.progress===3){
      new step3();

    }
    if(this.progress===2){
      new step2();
    }

   }

   back(){
    if(this.progress===4){
      this.progress-=2;
      return;
    }
    if(this.progress!==0){
    this.progress--;
    }
    if(this.progress===2){
      new backstep3();
    }
    if(this.progress===1){
      new backstep2();
    }
    if(this.progress===0){
      new backstep1();
    }
   }



}
