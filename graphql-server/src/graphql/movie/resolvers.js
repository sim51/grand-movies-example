import { neo4jgraphql } from 'neo4j-graphql-js';
import * as Neo4j from '../../utils/neo4j';
import * as Fs from '../../utils/fs';

// Provide resolver functions for your schema fields
export default {

  Query: {

    Movie( object, params, ctx, resolveInfo ) {
      return neo4jgraphql( object, params, ctx, resolveInfo );
    },

    MovieSearch: async ( root, args, context ) => {
      let query = `MATCH (n:Movie) WHERE  m.title CONTAINS $search RETURN n`;
      let result = await Neo4j.run( context.driver.session(), query, args, Neo4j.mappingNodeN );
      return result;
    },

  }

};
