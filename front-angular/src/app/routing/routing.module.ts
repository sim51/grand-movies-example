import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Movie
import { MovieSearchComponent } from './../movie/search/search.component';
import { MovieViewComponent } from './../movie/view/view.component';

export const routes: Routes = [
  { path: '*', redirectTo: '/' },
  { path: '', pathMatch: 'full', redirectTo: '/movie/search' },
  // Movie
  {
    path: 'movie', data: { menu: true, expand: false, name: 'Movie' },
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: MovieSearchComponent, data: { menu: false, name: 'Search' } },
      { path: ':id/:title', component: MovieViewComponent, data: { menu: false, name: ':title' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
