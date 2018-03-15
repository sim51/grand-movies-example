/* tslint:disable */
//  This file was automatically generated and should not be edited.
export interface searchQueryVariables {
  search?: string | null,
  skip?: number | null,
  limit?: number | null,
};

export interface searchQuery {
  movies:  Array< {
    movieId: string,
    title: string | null,
    released: string | null,
    plot: string | null,
    poster: string | null,
    imdbRating: number | null,
    genres:  Array< {
      name: string,
    } | null > | null,
  } | null > | null,
};
