import gql from 'graphql-tag';

export const QUERY_GET = gql`query get($id :ID!) {
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
    recommendations(skip:0, limit:4) {
      movieId
      title
    	poster
    	imdbRating
      plot
    }
  }
}`;
