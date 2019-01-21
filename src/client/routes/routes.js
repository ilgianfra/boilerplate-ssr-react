import loadable from '@loadable/component';
import App from '../components/App';
// import Home from '../components/Home';
// import About from '../components/About';

export default [
  {
    ...App,
    routes: [
      {
        component: loadable(() => import('../components/Home')),
        path: '/',
        exact: true
      },
      {
        component: loadable(() => import('../components/About')),
        path: '/about'
      }
    ]
  }
];
