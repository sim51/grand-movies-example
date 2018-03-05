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
    similarByGenre(skip: Int = 0, limit: Int = 5): [Movie] @cypher(statement: "MATCH (:Movie {movieId:this.movieId})-[:IN_GENRE]->(:Genre)<-[:IN_GENRE]-(o:Movie) RETURN o SKIP $skip LIMIT $limit")
    similarByUser(skip: Int = 0, limit: Int = 5): [Movie] @cypher(statement: "MATCH (m2:Movie)<-[r2:RATED]-(:User)-[r:RATED]->(:Movie {movieId:this.movieId}) RETURN m2, sum(r2.rating) AS score ORDER BY score DESC SKIP $skip LIMIT $limit")
  }

  type Query {
    Movie(movieId: ID!): Movie
    MovieSearch(search: String = "", skip: Int = 0, limit: Int = 10): [Movie]
    MovieSearchInGenre(genre:ID!, search: String = "", skip: Int = 0, limit: Int = 10): [Movie]
  }`;
