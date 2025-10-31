import { createBrowserRouter } from "react-router-dom"
import Layout from "../../shared/layouts/Layout";
import HomePage from "../../features/home/pages/HomePage";
import Transparency from "../../features/transparency/pages/Transparency";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path:'/transparencias', element: <Transparency />}
    ]
  }
])

export default router;