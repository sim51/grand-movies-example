import { neo4jgraphql } from 'neo4j-graphql-js';
import * as Neo4j from '../../utils/neo4j';
import * as Fs from '../../utils/fs';

// Provide resolver functions for your schema fields
export default {

  Query: {

    Actor( object, params, ctx, resolveInfo ) {
      return neo4jgraphql( object, params, ctx, resolveInfo );
    },
    ActorSearch: async ( root, args, context ) => {
      let query = `MATCH (n:Actor) WHERE  n.name CONTAINS $search RETURN n`;
      let result = await Neo4j.run( context.driver.session(), query, args, Neo4j.mappingNodeN );
      return result;
    },

    Director( object, params, ctx, resolveInfo ) {
      return neo4jgraphql( object, params, ctx, resolveInfo );
    },

    User( object, params, ctx, resolveInfo ) {
      return neo4jgraphql( object, params, ctx, resolveInfo );
    },

  }

};
