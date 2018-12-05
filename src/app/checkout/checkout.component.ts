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
    price: object;
    robots$: Object;
    empty: Boolean;
    stockError: Boolean;
    usr: Boolean;
    robstockerror: string;
    cart = [];
    constructor(public nav: NavbarService,
      private dataService: DataService,
      private router: Router) { }

  ngOnInit() {
    this.nav.show();
    if (localStorage.getItem('USER') == null) {
      this.router.navigate(['/login']);
    }
    this.cart = [];
    this.usr = true;
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

  removeFromCart(robotName) {
    localStorage.removeItem(robotName);
    location.reload();
  }

  updateCart(robotName, event) {
    const target = event.target;
    const newCount = target.querySelector('#' + robotName.split(' ').join('')).value;
    console.log(document.getElementById(name));
    localStorage.removeItem(robotName);
    if (newCount <= 0) {
      return;
    } else {
      localStorage.setItem(robotName, newCount.toString());
    }
  }

  updateRobot() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'USER') {
        continue;
      }
      const val = localStorage[key];
      this.dataService.updateRobot(key, val).subscribe(data => {});
    }
  }

  checkout() {
    let li = '';
    let am = '';
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
    this.cart = [];
    this.dataService.checkStock(li, am).subscribe(
      data => {if (!data) {
          this.router.navigate(['/confirmation/Not enough items in stock.']);
        } else {
          // Check user balance
          this.dataService.updateUser(localStorage.getItem('USER'), this.price).subscribe(
            data2 => {if (!data2) {
                this.router.navigate(['/confirmation/You do not have enough money.']);
              } else {
                this.updateRobot();
                const user = localStorage.getItem('USER');
                localStorage.clear();
                localStorage.setItem('USER', user);
                this.router.navigate(['/confirmation/Purchase successful. Thank you for shopping with us.']);
              }
            }
          );
        }
      }
    );
  }
}
