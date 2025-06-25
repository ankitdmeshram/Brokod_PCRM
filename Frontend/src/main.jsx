import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import '@fontsource/inter';
import "./index.css"
import Signup from './Auth/Signup.jsx';
import Signin from './Auth/Signin.jsx';
import ResetPassword from './Auth/ResetPassword.jsx';

const LazyComponent = (Component) => (
  <Component />
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      }
    ]
  },
]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
