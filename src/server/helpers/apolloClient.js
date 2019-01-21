import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const apolloClient = new ApolloClient({
  ssrMode: true,
  // Remember that this is the interface the SSR server will use to connect to the
  // API server, so we need to ensure it isn't firewalled, etc
  link: createHttpLink({
    fetch,
    uri: 'https://48p1r2roz4.sse.codesandbox.io/',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
