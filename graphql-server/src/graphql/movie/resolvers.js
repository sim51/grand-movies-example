import { neo4jgraphql } from 'neo4j-graphql-js';

import * as Neo4j from '../../utils/neo4j';
import * as Fs from '../../utils/fs';
import * as queries from './queries';

// Provide resolver functions for your schema fields
export default {

  Movie: {

    recommendations: async ( current, _, context ) => {
      let result = await Neo4j.run( context.driver.session(), queries.RECO, current, Neo4j.mappingNodeN );
      return result;
    }

  },

  Query: {

    Movie: async ( object, params, context, resolveInfo ) => {
      const mappingFunction = ( record ) => {
        let movie = record.get( "n" ).properties;
        movie.genres = record.get( "genres" ).map( ( item ) => { return item.properties } )
        movie.actors = record.get( "actors" ).map( ( item ) => { return item.properties } )
        movie.directors = record.get( "directors" ).map( ( item ) => { return item.properties } )
        console.log( movie );
        return movie;
      }
      let result = await Neo4j.run( context.driver.session(), queries.GET, params, mappingFunction );
      return result[ 0 ];
    },

    MovieSearch: async ( object, params, context, resolveInfo ) => {
      let result = await Neo4j.run( context.driver.session(), queries.SEARCH, params, Neo4j.mappingNodeN );
      return result;
    },

  }

};
