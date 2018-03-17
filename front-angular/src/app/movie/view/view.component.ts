import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getQuery, getQueryVariables } from './get.graphql.type';
import { QUERY_GET } from './get.graphql';

@Component({
  selector: 'grand-movie-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class MovieViewComponent implements OnInit {

  // The movie
  movie: getQuery['movie'];

  /**
   * Default constructor.
   * @param  apollo - Apollo service
   * @param  route - Angular ActivateRoute service.
   */
  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    // Nothing
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetch(params.id);
    });
  }

  fetch(id: string): void {
    this.apollo
      .watchQuery<getQuery, getQueryVariables>({ query: QUERY_GET, variables: { id } })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.movie = data.movie;
      });
  }

}
