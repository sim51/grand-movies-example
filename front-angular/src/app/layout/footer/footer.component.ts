import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'layout-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  brand=environment.brand;
  year=environment.year;

  constructor() { }

  ngOnInit() {
  }

}
