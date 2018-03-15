import * as queries from './queries';

export default `
  type Movie {
    movieId: ID!
    title: String
    released: Date
    plot: String
    poster: String
    imdbRating: Float
    genres: [Genre] @relation(name: "IN_GENRE", direction:"OUT")
    directors: [Director] @relation(name: "DIRECTED", direction:"IN")
    actors: [Actor] @relation(name: "ACTED_IN", direction:"IN")
    recommendations(skip: Int = 0, limit: Int = 10): [Movie]
  }

  type Query {
    Movie(movieId: ID!): Movie
    MovieSearch(search: String = "", skip: Int = 0, limit: Int = 10): [Movie]
  }`;
