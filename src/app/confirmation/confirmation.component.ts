import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  message: String;
  constructor(public nav: NavbarService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.message = params.message);
  }

  ngOnInit() {
    console.log(localStorage.getItem('USERC'));
    this.nav.show();
    if (localStorage.getItem('USER') == null) {
      this.router.navigate(['/login']);
    }
  }

}
