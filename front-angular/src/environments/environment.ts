// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // Layout
  logo: 'assets/images/logo.png',
  brand: 'Neo4j',
  year: '2018',

  // Graphql
  graphqlUrl: 'http://localhost:3000/graphql',
  remoteAssetsUrl: 'http://localhost:3000/'

};
