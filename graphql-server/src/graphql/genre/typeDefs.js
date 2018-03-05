export default `
  type Genre {
    name: ID!
  }

  type Query {
    Genre(id: ID!): Genre
  }`;
