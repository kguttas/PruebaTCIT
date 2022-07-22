import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));

const Error = React.lazy(() => import('./views/Error/Error'));


const routes = [
  { path: `/*`, exact: true, layout: ['Home'],  name: 'Error', element: Error },
  { path: `/`, exact: true, layout: ['Home'], name: 'Home', element: Home },
];

export default routes;
