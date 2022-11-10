import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from "react-cookie";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./routes/login/Login";
import { Home } from "./routes/home/Home";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: "home",
    element: <Home />
  },
  {
    path: "*", // catches all paths that are not matched yet
    element: <Login />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CookiesProvider>
  </React.StrictMode>
)
