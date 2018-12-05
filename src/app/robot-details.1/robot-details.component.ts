import { NavbarService } from './../navbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.scss']
})
export class RobotDetailsComponent implements OnInit {
  robot$: Object;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    public nav: NavbarService,
    private router: Router) {
    this.route.params.subscribe( params => this.robot$ = params.name);
  }

  ngOnInit() {
    this.nav.show();
    if (localStorage.getItem('USER') == null) {
      this.router.navigate(['/login']);
    }
    this.data.getRobot(this.robot$).subscribe(
      data => this.robot$ = data
    );
  }

  updateCart(robotName, event) {
    console.log('waffles');
    const target = event.target;
    const newCount = target.querySelector('#amount').value;
    const newRobotCount = localStorage.getItem(robotName);
    if (newRobotCount == null) {
      localStorage.setItem(robotName, newCount.toString());
    } else {
      const num = parseInt(newRobotCount, 10);
      const newn = num + parseInt(newCount, 10);
      localStorage.setItem(robotName, newn.toString());
    }
    this.router.navigate(['/checkout']);
  }
}
