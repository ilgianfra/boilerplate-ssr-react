import gql from 'graphql-tag';

export const EXAMPLE_QUERY = gql`{
  rates(currency: "USD") {
    name
    currency
  }
}`;
