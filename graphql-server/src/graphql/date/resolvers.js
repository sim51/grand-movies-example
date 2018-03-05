import { GraphQLScalarType } from 'graphql/type';
import * as Neo4j from '../../utils/neo4j';
import * as Fs from '../../utils/fs';
import assertErr from 'assert-err'
// Provide resolver functions for your schema fields
export default {

  Date: new GraphQLScalarType( {

    name: 'Date',

    /**
     * Serialize date value into string.
     * Get invoked when serializing the result to send it back to a client.
     * @param  {String} value date value as string with format 'yyy-mm-dd'
     * @return {String} date as string
     */
    serialize: function ( value ) {
      let date = new Date( value.toString() );
      assertErr( !isNaN( date.getTime() ), TypeError, 'Field error: value is an invalid Date' );
      return date.toJSON();
    },

    /**
     * Parse value into date.
     * Gets invoked to parse client input that was passed through variables.
     * @param  {*} value serialized date value
     * @return {Date} date value
     */
    parseValue: function ( value ) {
      let date = new Date( value.toString() );
      assertErr( !isNaN( date.getTime() ), TypeError, 'Field error: value is an invalid Date' );
      return date.toJSON().substring( 0, 10 );
    },

    /**
     * Parse ast literal to date.
     * Gets invoked to parse client input that was passed inline in the query.
     * @param  {Object} ast graphql ast
     * @return {Date} date value
     */
    parseLiteral: function ( ast ) {
      Assert.assertErr( ast.kind === Kind.STRING, GraphQLError, 'Query error: Can only parse strings to dates but got a: ' + ast.kind, [ ast ] );
      var result = new Date( ast.value );
      Assert.assertErr( !isNaN( result.getTime() ), GraphQLError, 'Query error: Invalid date', [ ast ] );
      Assert.assertErr( ast.value === result.toJSON(), GraphQLError, 'Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ', [ ast ] );
      return result
    }

  } )
};
