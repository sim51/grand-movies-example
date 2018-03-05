// Commons imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from 'app/routing/routing.module';
//Module components
import { DisplayObjectComponent } from './display-object/display-object.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
  declarations: [ DisplayObjectComponent, PageTitleComponent ],
  imports: [ BrowserModule, RoutingModule ],
  exports: [ DisplayObjectComponent, PageTitleComponent ],
  providers: [],
  bootstrap: []
})

export class SharedModule { }
