import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'grand-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  logo: String = environment.logo;
  brand: String = environment.brand;
  routes: Array<Route>;

  constructor(private router: Router) {
    // Nothing
  }

  ngOnInit(): void {
    this.routes = this.router.config;
  }

}
