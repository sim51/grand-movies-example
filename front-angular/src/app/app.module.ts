import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { LayoutModule } from './layout/layout.module';
import { MovieModule } from './movie/movie.module';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/routing.module';
import { createUploadLink } from 'apollo-upload-client';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LayoutModule,
    RoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MovieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: createUploadLink({ uri: environment.graphqlUrl }),
      cache: new InMemoryCache()
    });
  }

}
