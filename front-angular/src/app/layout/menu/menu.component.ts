import { Component, Input, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'grand-layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() routes: Array<Route> = [];
  @Input() path: string;
  menu: Array<Route> = [];

  constructor() {
    // Nothing
  }

  ngOnInit(): void {
    this.menu = this.routes.filter(
      item => {
        return (item.data && item.data.menu) ? item.data.menu : false;
      }
    );
  }

}
