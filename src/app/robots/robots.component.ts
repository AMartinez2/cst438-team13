import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.scss']
})
export class RobotsComponent implements OnInit {

  robots$: Object;
  cart = [];
  balance: string;

  constructor(
    private rdataService: DataService,
    private router: Router,
    public nav: NavbarService) { }

  ngOnInit() {
    console.log(localStorage.getItem('USERC'));
    this.nav.show();
    if (localStorage.getItem('USER') == null) {
      this.router.navigate(['/login']);
    }
    this.rdataService.getRobots().subscribe(
      data => this.robots$ = data
    );
  }

  addToCart(robotName) {
    const robotCount = localStorage.getItem(robotName);
    if (robotCount == null) {
      localStorage.setItem(robotName, '1');
    } else {
      const num = parseInt(robotCount, 10);
      const newn = num + 1;
      localStorage.setItem(robotName, newn.toString());
    }
    this.router.navigate(['/checkout']);
  }

}
