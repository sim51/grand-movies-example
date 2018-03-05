import { neo4jgraphql } from 'neo4j-graphql-js';

// Provide resolver functions for your schema fields
export default {

  Query: {

    Genre: async ( object, params, context, resolveInfo ) => {
      return neo4jgraphql( object, params, context, resolveInfo );
    },

  }

};
