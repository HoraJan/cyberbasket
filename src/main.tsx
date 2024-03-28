import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ROUTES } from './utils/routes';
import { Generator } from './pages/Generator';
import i18n from './utils/i18n';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Outlet />
    ),
    errorElement: <div>something went wrong</div>,
    children: [
      { children: [
        {
          index: true,
          element: (<Navigate to={ROUTES.generator} />),
        },
        {
          path: ROUTES.generator,
          element: <Generator />,
        },
      ] },
    ],
  }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>,
);
