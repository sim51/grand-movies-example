import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { apolloUploadExpress } from 'apollo-upload-server';
import bodyParser from 'body-parser';
import * as Neo4j from './utils/neo4j';
import { schema } from './graphql/schema';
import path from 'path';

// Checking Neo4j env configuration
Neo4j.checkEnvForConfiguration();

const PORT = 3000;
const server = express();

server.use(
  '/uploads',
  express.static( path.join( __dirname, '../uploads' ) )
);

/**
 * This part is usefull for angularjs.
 * It enable CORS + OPTIONS request for the graphql endpoint.
 */
server.use(
  '/graphql',
  ( req, res, next ) => {
    res.header( 'Access-Control-Allow-Credentials', true );
    res.header( 'Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin' );
    res.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS' );
    res.header( 'Allow', 'POST, GET, OPTIONS' );
    res.header( 'Access-Control-Allow-Origin', '*' );

    if ( req.method === 'OPTIONS' ) {
      res.sendStatus( 200 );
    } else {
      next();
    }
  }
);

/**
 * Create the graphql endpoint.
 */
server.use(
  '/graphql',
  bodyParser.json(),
  apolloUploadExpress(),
  graphqlExpress(
    async ( request ) => {
      return {
        schema: schema,
        context: Neo4j.context( request.headers, process.env ),
        tracing: true,
      };
    }
  )
);

/**
 * Create the graphiql endpoint.
 */
server.use(
  '/graphiql',
  graphiqlExpress( {
    endpointURL: '/graphql',
    query: `query($id:ID!) {
  Movie(movieId:$id) {
    movieId
    title
    year
    plot
    poster
    imdbRating
    genres{
      name
    }
    directors {
      name
    }
    actors {
      name
    }
		similarByUser {
      movieId
      title
      poster
    }
    similarByGenre {
      movieId
      title
      poster
    }
  }
}`,
  } )
);

/**
 * Run the server.
 */
server.listen( PORT, () => {
  console.log( `GraphQL Server is now running on http://localhost:${PORT}/graphql` );
  console.log( `View GraphiQL at http://localhost:${PORT}/graphiql` );
} );
