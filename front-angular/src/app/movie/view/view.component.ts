import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'environments/environment';
import { Apollo } from 'apollo-angular';
import { QUERY_GET } from './get.graphql';
import { getQuery, getQueryVariables } from './get.graphql.type';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class MovieViewComponent implements OnInit {

  // The movie
  movie :getQuery["movie"];

  /**
   * Default constructor.
   * @param  {Apollo} apollo - Apollo service
   * @param  {ActivatedRoute} route - Angular ActivateRoute service.
   */
  constructor(private apollo :Apollo, private route :ActivatedRoute) {
    // Nothing
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.fetch(params.id);
    });
  }


  fetch(id :string) {
    this.apollo
        .watchQuery<getQuery, getQueryVariables>( { query: QUERY_GET, variables: { id: id } })
        .valueChanges
        .subscribe( ({ data, loading }) => {
            this.movie = data.movie;
        });
  }

}
