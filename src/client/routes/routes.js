import loadable from '@loadable/component';
import App from '../components/App';

const Home = loadable(() => import(/* webpackChunkName: "HomeComponent" */ '../components/Home'));
const About = loadable(() => import('../components/About'));

export default [
  {
    ...App,
    routes: [
      {
        component: Home,
        path: '/',
        exact: true
      },
      {
        component: About,
        path: '/about'
      }
    ]
  }
];
