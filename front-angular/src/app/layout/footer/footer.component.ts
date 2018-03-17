import { Component } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'grand-layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  brand: string = environment.brand;
  year: string = environment.year;

  constructor() {
    // Nothing
  }

}
