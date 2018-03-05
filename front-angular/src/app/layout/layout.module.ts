// Commons imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Module components import
import { RoutingModule } from 'app/routing/routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LinkComponent } from './link/link.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [ HeaderComponent, FooterComponent, MenuComponent, LinkComponent, BreadcrumbComponent, MainComponent ],
  imports: [ BrowserModule, RoutingModule],
  exports: [ HeaderComponent, FooterComponent, MenuComponent, BreadcrumbComponent, MainComponent ],
  providers: [],
  bootstrap: []
})

export class LayoutModule { }
