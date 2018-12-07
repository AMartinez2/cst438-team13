import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean;
  constructor(private router: Router, public nav: NavbarService) { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
