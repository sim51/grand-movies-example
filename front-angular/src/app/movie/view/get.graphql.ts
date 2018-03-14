import gql from 'graphql-tag';

export const QUERY_GET = gql `query get($id :ID!) {
  movie :Movie(movieId:$id) {
    movieId
    title
    released
    plot
    poster
    imdbRating
    genres {
      name
    }
    actors{
      name
    }
    directors{
      name
    }
    recommendations {
      movieId
      title
    	poster
    	imdbRating
    }
  }
}`;
