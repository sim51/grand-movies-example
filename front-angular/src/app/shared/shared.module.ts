// Commons imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './../routing/routing.module';
// Module components
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
  declarations: [PageTitleComponent],
  imports: [BrowserModule, RoutingModule],
  exports: [PageTitleComponent],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
