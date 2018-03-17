import { Component, Input, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'grand-menu-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() route: Route;
  @Input() path: string = '';
  currentPath: string;

  constructor() {
    // Nothing
  }

  ngOnInit(): void {
    if (this.route) {
      this.currentPath = `${this.path}/${this.route.path}`;
    }
  }

}
