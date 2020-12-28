/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listProducts = /* GraphQL */ `
  query ListProducts {
    listProducts {
      id
      name
      description
      image
      sku
      weight
      price
    }
  }
`;
export const getVendor = /* GraphQL */ `
  query GetVendor($id: ID!) {
    getVendor(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listVendors = /* GraphQL */ `
  query ListVendors(
    $filter: ModelVendorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVendors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
