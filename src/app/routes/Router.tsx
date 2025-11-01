import { createBrowserRouter, Navigate } from "react-router-dom"
import Layout from "../../shared/layouts/Layout";
import HomePage from "../../features/home/pages/HomePage";
import Transparency from "../../features/transparency/pages/Transparency";
import AboutUs from "../../features/about-us/pages/AboutUs";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path:'/transparencias', element: <Transparency />},
      {path:'/nosotros', element: <AboutUs />},
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
])

export default router;