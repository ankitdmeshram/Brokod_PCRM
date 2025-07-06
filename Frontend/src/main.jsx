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

        children: [
          {
            path: "/workspaces",
            element: LazyComponent(lazy(() => import("./Workspaces/WP_Workspaces.jsx")))
          },
          {
            path: "/workspaces/:ws_code",
            element: LazyComponent(lazy(() => import("./Workspaces/Projects/Pro_Dashboard.jsx"))),
            children: [
              {
                path: "/workspaces/:ws_code",
                element: LazyComponent(lazy(() => import("./Workspaces/Projects/Pro_Analytics.jsx")))
              },
              {
                path: "/workspaces/:ws_code/projects",
                element: LazyComponent(lazy(() => import("./Workspaces/Projects/Pro_Projects.jsx")))
              },
              {
                path: "/workspaces/:ws_code/users",
                element: LazyComponent(lazy(() => import("./Workspaces/Projects/Pro_Users.jsx")))
              },
              {
                path: "/workspaces/:ws_code/settings",
                element: LazyComponent(lazy(() => import("./Workspaces/Projects/Pro_Settings.jsx")))
              }
            ]
          }
        ]
      },
    ]
  },
]
);

createRoot(document.getElementById('root')).render(
  <AppContext>
    <RouterProvider router={router} />
  </AppContext>
)
