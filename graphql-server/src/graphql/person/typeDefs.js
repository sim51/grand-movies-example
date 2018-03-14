import * as queries from './queries';

export default `
  interface Person {
    name: ID!
  }

  type User implements Person {
    name: ID!
  }

  type Actor implements Person {
    name: ID!
    actedIn: [Movie]
  }

  type Director implements Person {
    name: ID!
    directed: [Movie]
  }`;
