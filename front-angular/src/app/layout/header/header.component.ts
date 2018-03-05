import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  logo: String = environment.logo;
  brand: String = environment.brand;
  routes :Route[];


  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routes = this.router.config;
  }

}
