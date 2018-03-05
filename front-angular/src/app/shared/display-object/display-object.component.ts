import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'display-object',
  templateUrl: './display-object.component.html',
  styleUrls: ['./display-object.component.scss']
})
export class DisplayObjectComponent  implements OnInit{

  @Input() object:any;
  @Input() blacklist:Array<String> = [];
  @Input() inlineSeparator:any = null;
  keys:any;

  constructor() {}

  ngOnInit() {
    // find keys that are not blacklisted and wherethe key has a value
    this.keys = Object.keys(this.object).filter( (key) =>{
      let result = true;

      if(key == '__typename'){
        result = false;
      }

      if(this.blacklist.includes(key)) {
        result = false;
      }

      if(this.object[key] == null || this.object[key] == '') {
        result = false;
      }

      return result;
    })
  }

}
