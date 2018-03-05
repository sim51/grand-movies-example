import * as Neo4j from '../../utils/neo4j';
import * as Fs from '../../utils/fs';

// Provide resolver functions for your schema fields
export default {

  Division: {

    address: async ( current, _, context ) => {
      let query = `MATCH (:Division {id:$id})-[:LOCATED_AT]->(n:Address) RETURN n LIMIT 1`;
      let params = { id: current.id };
      let result = await Neo4j.run( context.driver.session(), query, params, Neo4j.mappingNodeN );
      return result[ 0 ];
    },

    members: async ( current, _, context ) => {
      let query = `MATCH(:Division {id:$id})<-[:MEMBER_OF]->(n:Person) RETURN n LIMIT 1`;
      let params = { id: current.id };
      return await Neo4j.run( context.driver.session(), query, params, Neo4j.mappingNodeN );
    },

  },

  Address: {

    country: async ( current, _, context ) => {
      let query = `MATCH(:Address {id:$id})-[:IN_COUTRY]->(n:Country) RETURN n LIMIT 1`;
      let params = { id: current.id };
      let result = await Neo4j.run( context.driver.session(), query, params, Neo4j.mappingNodeN );
      return result[ 0 ].name;
    }

  },

  Query: {

    getDivisionById: async ( root, args, context ) => {
      let query = `MATCH (n:ProblemCategory) WHERE size(()-[:HAS_SUB_PROBLEM]->(n))=0 RETURN n`;
      return Neo4j.run( context.driver.session(), query, args, Neo4j.mappingNodeN );
    }

  }

};
