import { Component, OnInit, Input } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'menu-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() route :Route;
  @Input() path :string;
  currentPath :string;

  constructor() {
  }

  ngOnInit() {
    this.currentPath = this.path + '/' + this.route.path;
  }

}
