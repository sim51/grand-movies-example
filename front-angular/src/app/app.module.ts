// Commons import
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'environments/environment';

// Apollo & GraphQl
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { createUploadLink } from 'apollo-upload-client'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Components & modules import
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RoutingModule } from './routing/routing.module';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    LayoutModule,
    RoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor( apollo: Apollo, httpLink: HttpLink ) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: createUploadLink({ uri: environment.graphqlUrl }),
      cache: new InMemoryCache()
    });
  }

}
