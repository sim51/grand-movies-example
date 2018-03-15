import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Apollo, QueryRef } from 'apollo-angular';
import { QUERY_SEARCH } from './search.graphql';
import { searchQuery, searchQueryVariables } from './search.graphql.type';

@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  // search fields
  search :string = '';
  limit :number = 20;
  skip :number = 0;
  // GraphQL query
  query :QueryRef<searchQuery, searchQueryVariables>;
  // Graphql result
  movies :searchQuery["movies"];
  loading :boolean = false;
  hasMore :boolean = true;

  /**
   * Default constructor.
   * @param  {Apollo} apollo - Apollo service
   * @param  {ActivatedRoute} route - Angular ActivateRoute service.
   * @param  {Router} router - Angular Router service.
   */
  constructor(private apollo :Apollo, private route :ActivatedRoute, private router: Router) {
    // Nothing
  }

  /**
   * What we do on the initialization of the component ?
   */
  ngOnInit() {
    // If there are some query params, we take them to intiate the component state
    this.route.queryParams.subscribe((params :Params) => {
      if(Object.keys(params).length > 0) {
        this.search = params.search || '';
        this.limit = params.limit || 20;
        this.skip = params.skip || 0;
      }
      this.fetch();
    });
  }

  doSearch() {
    this.router.navigate(['/movie/search'], { queryParams: { search: this.search} });
    this.fetch();
  }

  /**
   * Perform the graphQl query and load the data into the component
   */
  fetch() {
    this.query = this.apollo.watchQuery<searchQuery, searchQueryVariables>(
      {
        query: QUERY_SEARCH,
        variables: {
          search: this.search,
          limit: this.limit,
          skip: this.skip,
        }
      }
    );

    this.query.valueChanges.subscribe(
      ({ data, loading }) => {
          this.loading = loading;
          this.movies = data.movies;
          if(this.movies.length == this.limit) {
            this.hasMore = true;
          }
          else {
            this.hasMore = false;
          }
      }
    );
  }

  fetchMore(){
    this.skip = this.skip + this.limit;
    this.query.fetchMore(
      {
        variables: {
          searchText: this.search,
          limit: this.limit,
          skip: this.skip
        },

        // We are able to figure out which offset to use because it matches
        // the feed length, but we could also use state, or the previous
        // variables to calculate this (see the cursor example below)
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult.movies.length == 0) {
            this.hasMore = false;
          }
          return Object.assign({}, prev, { movies: [...prev.movies, ...fetchMoreResult.movies] });
        },
      }
    );
  }

}
