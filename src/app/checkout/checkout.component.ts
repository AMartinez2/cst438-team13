import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    empty: Boolean;
    cart = [];
    checkoutError: boolean;
    price: object;
    robots$: Object;
    rob = [];
    constructor(public nav: NavbarService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.checkoutError = false;
    this.cart = [];
    this.nav.show();
    let li: string;
    let am: string;
    li = '';
    am = '';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'USER') {
        continue;
      }
      const val = localStorage.getItem(key);
      this.cart.push({ key: key, val : val});
      li = li + key + ',';
      am = am + val + ',';
    }
    li = li.substr(0, li.length - 1);
    am = am.substr(0, am.length - 1);
    if (this.cart == null || Object.keys(this.cart).length === 0) {
      this.empty = true;
    } else {
      this.empty = false;
      this.dataService.getPrice(li, am).subscribe(
        data => this.price = data
      );
    }
  }

  updateCart(robotName, event) {
    const target = event.target;
    const newCount = target.querySelector('#' + robotName.split(' ').join('')).value;
    if (newCount <= 0) {
      localStorage.removeItem(robotName);
      return;
    }
    localStorage.setItem(robotName, newCount.toString());
  }

  checkout() {
    console.log('start');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'USER') {
        continue;
      }
      const val = localStorage[key];
      console.log(val);
      this.dataService.updateRobot(key, val).subscribe(
        data => {if (data) {
            this.rob.push({key: 1});
          } else {
            this.rob.push({key: 0});
          }
        }
      );
    }
    // TODO: change this logic to match the `updateRobot` logic
    if (!this.dataService.updateUser(localStorage.getItem('USER'), this.price)) {
    }
    this.router.navigate(['/robots']);
  }
}
