import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import renderer from './helpers/renderer';

// TODO added to avoid the server to be called twice, it needs to be removed
function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}

dotenv.config();
const app = express();

app.use(express.static('public')); // static middlewere to serve public directory
app.set('views', 'src/');
app.use(ignoreFavicon);

app.get('*', async (req, res) => {

  const context = {};

  if (context.url) {
    return res.redirect(301, context.url);
  }
  if (context.notFound) {
    res.status(404);
  }

  const {
    stream, apolloClient, scriptTags
  } = await renderer(req, context);

  res.set('content-type', 'text/html');
  res.write(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <title>React boilerplate SSR</title>
</head>
<body>
  <div id="root">
  `)

  stream.pipe(
    res,
    { end: false },
  );
  stream.on('end', () => {
    res.end(`
    </div>
  <script type="text/javascript">
    window.__APOLLO_STATE__ = ${apolloClient};
  </script>
  ${scriptTags}
</body>
</html>
    `);
  });

});

app.listen(config.port, () => {
  console.info(`Running on ${config.port}...`);
});
