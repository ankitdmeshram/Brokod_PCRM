import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import '@fontsource/inter';
import "./index.css"
import Signup from './Auth/Signup.jsx';
import Signin from './Auth/Signin.jsx';

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
        path: "/register",
        element: <Signup />
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
