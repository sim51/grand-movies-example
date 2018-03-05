import { v1 as neo4j } from 'neo4j-driver';

// Instance of the Neo4j driver
let driver;

// Default Neo4j configuration
let defaultConfig = { user: 'neo4j', password: 'admin', url: 'bolt://localhost' };

/**
 * Function to get context from the request.
 *
 * @param {object} parameters headers (lowercased http headers)
 * @param {object} secrets secrets defined in secrets section).
 * @return {object|promise} It must return an object (or a promise resolving to it).
 */
export const context = ( headers, secrets ) => {
  if ( !driver )
    driver = neo4j.driver( secrets.NEO4J_URI, neo4j.auth.basic( secrets.NEO4J_USER, secrets.NEO4J_PASSWORD ) )
  return { driver }
};

/**
 * Check the environment variables for Neo4j configuration.
 * If not found, we take the default one.
 */
export const checkEnvForConfiguration = () => {
  if ( typeof process.env.NEO4J_USER === 'undefined' ) {
    console.warn( 'WARNING: process.env.NEO4J_USER is not defined. Default is ' + defaultConfig.user );
    process.env.NEO4J_USER = defaultConfig.user;
  }
  if ( typeof process.env.NEO4J_PASSWORD === 'undefined' ) {
    console.warn( 'WARNING: process.env.NEO4J_PASSWORD is not defined. Take the default one' );
    process.env.NEO4J_PASSWORD = defaultConfig.password;
  }
  if ( typeof process.env.NEO4J_URI === 'undefined' ) {
    console.warn( 'WARNING: process.env.NEO4J_URI is not defined. Default is ' + defaultConfig.url );
    process.env.NEO4J_URI = defaultConfig.url;
  }
}

/**
 * Run a cypher query, and project the result following the given mapping function.
 *
 * @param {session} session Neo4j driver session
 * @param {string} query Cypher query to execute
 * @param {object} params Query's parameters
 * @param {function} mapping Function that make the projection from a Neo4j Record
 * @return {array} The query's result with the given projection
 */
export const run = async ( session, query, params, mapping ) => {
  console.log( "Query is \n" + query + " \n with params \n" + JSON.stringify( params ) );
  let result = await session.run( query, params );
  return result.records.map( mapping );
}

/**
 * Simple projection function that transform a Neo4j Record with a Node called `n`
 * to an JS object that all the properties of the node.
 *
 * @param {record} record A Neo4j record from a query's result
 * @return {object} Return the projection of the record.
 */
export const mappingNodeN = ( record ) => {
  return record.get( "n" ).properties;
}
