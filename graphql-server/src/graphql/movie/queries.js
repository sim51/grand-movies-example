export const SEARCH = `
  MATCH (n:Movie)
  WHERE  n.title CONTAINS $search
  RETURN n
  SKIP $skip
  LIMIT $limit
`.replace( /\n/g, ' ' );

export const GET = `
  MATCH (n:Movie)
  WHERE  n.movieId=toString($movieId)
  RETURN
    n,
    [(a)-[:ACTED_IN]->(n) | a] AS actors,
    [(p)-[:DIRECTED]->(n) | p] AS directors,
    [(n)-[:IN_GENRE]->(g:Genre) | g] AS genres
  LIMIT 1
`.replace( /\n/g, ' ' );

export const RECO = `
  MATCH (m:Movie {movieId:$movieId})-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(n:Movie)
  WITH m, n, COUNT(*) AS genreOverlap
  MATCH (m)<-[:RATED]-(:User)-[:RATED]->(n)
  WITH n, genreOverlap, COUNT(*) AS userRatedScore
  RETURN n
  ORDER BY (0.9 * genreOverlap) + (0.1 * userRatedScore)  DESC
  SKIP $skip
  LIMIT $limit
`.replace( /\n/g, ' ' );
