import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  empty: Boolean;
  cart = [];
  constructor(public nav: NavbarService) { }

  ngOnInit() {
    this.cart = [];
    this.nav.show();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'USER') {
        continue;
      }
      const val = localStorage.getItem(key);
      this.cart.push({ key: key, val : val});
    }
    if (this.cart == null || Object.keys(this.cart).length === 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  updateCart(robotName, event) {
    const target = event.target;
    const newCount = target.querySelector('#' + robotName.split(' ').join('')).value;
    localStorage.setItem(robotName, newCount.toString());
  }

  // Call to checkout ms
  checkout() {
    return;
  }
}
