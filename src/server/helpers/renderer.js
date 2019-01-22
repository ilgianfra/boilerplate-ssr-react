import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { renderToNodeStream } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import routes from '../../client/routes';
import apolloClient from './apolloClient';

const statsFile = path.resolve('./public/loadable-stats.json');

const renderer = async (req, context) => {

  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

  const App = (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </ApolloProvider>
  );

  // Styled components
  const sheet = new ServerStyleSheet();
  let jsx = sheet.collectStyles(App);
  jsx = extractor.collectChunks(App);
  const scriptTags = extractor.getScriptTags();
  console.log('scriptTags', scriptTags);

  // Apollo
  await getDataFromTree(jsx);
  const apolloState = serialize(apolloClient.extract());

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  return {
    stream,
    apolloClient: apolloState,
    scriptTags,
  };

};

export default renderer;
