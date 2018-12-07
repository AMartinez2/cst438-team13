import { NavbarService } from './../navbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInFailed: boolean;
  users$: Object;
  constructor(
    private dataService: DataService,
    private router: Router,
    private navbar: NavbarService) {
    // Hide the navbar
    navbar.hide();
    // Get all users
    this.dataService.getAllUsers().subscribe(
      data => {
        this.users$ = data;
      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem('USER') != null) {
      this.router.navigate(['/robots']);
    }
  }

  loginAttempt(event) {
    localStorage.clear();
    // Retrieve the login form data from the DOM
    event.preventDefault();
    const target = event.target;
    const DomUn = target.querySelector('#username').value;
    const DomPw = target.querySelector('#password').value;
    if (DomPw === '') {
      this.logInFailed = true;
    }
    // Check to see if given user matches user in db
    for (const usr in this.users$) {
      if (DomUn.split(' ').join('') === this.users$[usr]['usid']) {
        this.router.navigate(['/robots']);
        // Store user name in local storage
        localStorage.setItem('USER', DomUn);
        localStorage.setItem('balance', this.users$[usr]['balance']);
      } else {

        console.log('waffles');
      }
    }
  }

}
