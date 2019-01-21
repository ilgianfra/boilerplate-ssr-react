import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import routes from './routes';

const API_HOST = 'https://48p1r2roz4.sse.codesandbox.io/';
const links = [
  createHttpLink({
    uri: API_HOST,
    credentials: 'same-origin'
  })
];

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  connectToDevTools: true,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

loadableReady(() => {
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>{renderRoutes(routes)}</div>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  );
});
