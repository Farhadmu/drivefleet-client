import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ExploreCars from "../pages/ExploreCars/ExploreCars";
import CarDetails from "../pages/CarDetails/CarDetails";
import AddCar from "../pages/AddCar/AddCar";
import MyBookings from "../pages/MyBookings/MyBookings";
import MyAddedCars from "../pages/MyAddedCars/MyAddedCars";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "explore-cars", element: <ExploreCars /> },
      {
        path: "cars/:id",
        element: <CarDetails />,
      },
      {
        path: "add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-cars",
        element: (
          <PrivateRoute>
            <MyAddedCars />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
