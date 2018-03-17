import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
// Application modules
import { RoutingModule } from './../routing/routing.module';
import { LayoutModule } from './../layout/layout.module';
import { SharedModule } from './../shared/shared.module';
// Module components
import { MovieSearchComponent } from './search/search.component';
import { MovieViewComponent } from './view/view.component';
import { MovieViewCardComponent } from './view-card/view-card.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    RoutingModule,
    LayoutModule,
    SharedModule
  ],
  declarations: [MovieSearchComponent, MovieViewComponent, MovieViewCardComponent]
})
export class MovieModule { }
