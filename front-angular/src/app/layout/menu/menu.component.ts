import { Component, OnInit, Input } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input() routes :Route[];
  @Input() path :string;
  menu :Route[] = [];

  constructor() {}

  ngOnInit() {
    if(this.routes != null){
      this.menu = this.routes.filter(
        (item) => {
          return ((item.data != null) && (item.data.menu != null))?item.data.menu:false
        }
      );
    }
  }

}
