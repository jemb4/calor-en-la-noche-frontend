import { createBrowserRouter } from "react-router-dom"
import Layout from "../../shared/layouts/Layout";
import HomePage from "../../features/home/pages/HomePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />}
    ]
  }
])

export default router;