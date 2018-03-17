/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface getQueryVariables {
  id: string,
};

export interface getQuery {
  movie: {
    movieId: string,
    title: string | null,
    released: string | null,
    plot: string | null,
    poster: string | null,
    imdbRating: number | null,
    genres: Array<{
      name: string,
    } | null> | null,
    actors: Array<{
      name: string,
    } | null> | null,
    directors: Array<{
      name: string,
    } | null> | null,
    recommendations: Array<{
      movieId: string,
      title: string | null,
      poster: string | null,
      imdbRating: number | null,
      plot: string | null,
    } | null> | null,
  } | null,
};
