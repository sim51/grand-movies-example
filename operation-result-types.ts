/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface searchQueryVariables {
  id: string,
};

export interface searchQuery {
  Movie:  {
    movieId: string,
    title: string | null,
    plot: string | null,
    poster: string | null,
    imdbRating: number | null,
    genres:  Array< {
      name: string,
    } | null > | null,
    directors:  Array< {
      name: string,
    } | null > | null,
    actors:  Array< {
      name: string,
    } | null > | null,
    similarByUser:  Array< {
      movieId: string,
      title: string | null,
      poster: string | null,
    } | null > | null,
    similarByGenre:  Array< {
      movieId: string,
      title: string | null,
      poster: string | null,
    } | null > | null,
  } | null,
};
