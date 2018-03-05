export default `
  type Division {
    id: ID!
    name: String
    address: Address

    members: [Person]
  }

  type Address {
    id: ID!
    city: String
    street: String
    postalCode: String
    country: String
  }

  type Query {
    getDivisionById(id: ID!): Claim
  }`;
