const RECO_USER_QUERY = `` +
  `MATCH (this)-[r1:RATED]->(:Movie)<-[r2:RATED]-(u2:User) ` +
  `WHERE abs(r1.rating - r2.rating) < 1 ` +
  `WITH u1, u2 ORDER BY COUNT(*) DESC LIMIT 50 ` +
  `  MATCH (u2)-[r:RATED]->(m:Movie) ` +
  `  WHERE NOT (u1)-[r:RATED]->(m) ` +
  `  RETURN m, sum(r.rating) AS score ` +
  `  ORDER BY score DESC ` +
  `  SKIP $skip ` +
  `  LIMIT $limit`;

export default `
  interface Person {
    name: ID!
  }

  type User implements Person {
    name: ID!
    recommendations(skip: Int = 0, limit: Int = 5): [Movie] @cypher(statement: "${RECO_USER_QUERY}")
  }

  type Actor implements Person {
    name: ID!
    actedIn: [Movie] @relation(name: "ACTED_IN", direction:"OUT")
  }

  type Director implements Person {
    name: ID!
    directed: [Movie] @relation(name: "DIRECTED", direction:"OUT")
  }

  type Query {
    Actor(id: ID!): Actor
    ActorSearch(search:String!): [Actor]
    Director(id: ID!): Director
    User(id: ID!): User
  }`;
