import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Test from "../pages/test";
import Products from "../pages/Products/Products";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AddProduct from "../pages/AddProduct/AddProduct";
import ProtectedRoute from "./ProtectorRoute";
import SellProduct from "../pages/SellProduct/SellProduct";
import SellsHistory from "../pages/sellsHistory/SellsHistory";
import EditAndCreateNew from "../pages/Products/EditAndCreateNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Test />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:productId",
        element: (
          <ProtectedRoute>
            <EditAndCreateNew />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sell-product",
        element: (
          <ProtectedRoute>
            <SellProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sells-history",
        element: (
          <ProtectedRoute>
            <SellsHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
