import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import '@fontsource/inter';
import "./index.css"
import Signup from './Auth/Signup.jsx';
import Signin from './Auth/Signin.jsx';
import ResetPassword from './Auth/ResetPassword.jsx';
import AppContext from './Context/AuthContext.jsx';
import ErrorPage from './ErrorPage.jsx';
import { WorkSpaceContext } from './Context/WorkspaceContext.jsx';
import WP_Dashboard from './Workspaces/WP_Dashboard.jsx';

const LazyComponent = (Component) => (
  <Component />
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Signin />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      },
      {
        path: "/workspaces",
        element: LazyComponent(lazy(() => import('./Workspaces/WP_Dashboard.jsx'))),
      },

      {
        path: "/dashboard",
        element: LazyComponent(lazy(() => import('./Projects/Dashboard.jsx'))),
        children: [
          // {
          //   path: "/dashboard/test1",
          //   element: LazyComponent(lazy(() => import('./Projects/Test1.jsx'))),
          // },
          // {
          //   path: "/dashboard/test2",
          //   element: LazyComponent(lazy(() => import('./Projects/Test2.jsx'))),
          // },
        ]
      }
    ]
  },
]
);

createRoot(document.getElementById('root')).render(
  <AppContext>
    <RouterProvider router={router} />
  </AppContext>
)
