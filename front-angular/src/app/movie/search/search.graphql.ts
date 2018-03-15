import gql from 'graphql-tag';

export const QUERY_SEARCH = gql`query search($search :String = "", $skip :Int = 0, $limit :Int = 10) {
  movies :MovieSearch(search: $search, skip: $skip, limit: $limit) {
    movieId
    title
    released
    plot
    poster
    imdbRating
    genres {
      name
    }
  }
}`;
