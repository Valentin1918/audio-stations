import React from 'react';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { ROUTES } from './constants';
import { Layout } from './components';
import { Stations, Page404 } from './pages';

const { ROOT, STATIONS } = ROUTES;

const CreateRoutes = () => {
  const privateRoutes: RouteObject[] = [
    {
      path: ROOT,
      element: <Navigate to={STATIONS} />,
    },
    {
      path: STATIONS,
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Stations />,
        },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];

  return privateRoutes;
};

const Routes = () => useRoutes(CreateRoutes());

export default Routes;
