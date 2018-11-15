import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment.js';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  btnDisabled = false;
  handler: any;

  quantities = [];

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.data.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data['price'] * this.quantities[index];
    });

    return total;
  }

  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this.data.removeFromCart(product);
  }

  ngOnInit() {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });
  }

  validate() {
    if (!this.quantities.every(data => data > 0)) {
      this.data.warning('Quantity cannot be less than one');
    }

    else if (!localStorage.getItem('token')) {
      this.router.navigate(['/login'])
        .then(() => {
          this.data.warning('You need to login before making a purchase!');
        });
    }

    else if (!this.data.user['address']) {
      this.router.navigate(['/profile/address'])
        .then(() => {
          this.data.warning('You need ot login before making a purchase!');
        });
    }

    else {
      this.data.message = '';
      return true;
    }
  }


  checkout() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.handler.open({
          name: 'Amazono',
          description: 'Checkout Payment',
          amount: this.cartTotal * 100,
          closed: () => {
            this.btnDisabled = false;
          }
        });
      } else {
        this.btnDisabled = false;
      }
    }
  }

}
