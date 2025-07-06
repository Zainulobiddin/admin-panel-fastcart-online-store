import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import LogIn from "./components/log-in/log-in";
import AddProducts from "./components/add-products/add-products";
import EditProducts from "./components/edit-products/edit-products";
import Brands from "./components/brands/brands";
import Subcategories from "./components/subcategories/subcategories";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashbord />,
      children: [
        {
          path: "/",
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/add-products",
          element: <AddProducts />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/edit-products/:id",
          element: <EditProducts />,
        },
        {
          path: '/brands',
          element: <Brands/>
        },
        {
          path: '/subcategories',
          element: <Subcategories/>
        }
      ],
    },
    {
          path: "/log-in",
          element: <LogIn />,
        },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
