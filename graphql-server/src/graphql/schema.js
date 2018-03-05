import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';

const typesArray = fileLoader( path.join( __dirname, './**/typeDefs.js' ) );
const resolversArray = fileLoader( path.join( __dirname, './**/resolvers.js' ) );

export const schema = makeExecutableSchema( {
  typeDefs: mergeTypes( typesArray ),
  resolvers: mergeResolvers( resolversArray ),
} );
