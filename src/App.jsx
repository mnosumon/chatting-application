import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import RouteLayout from "./components/routeLayout/RouteLayout";
import LoginUser from "./privetRoute/LoginUser";
import NotLoginUser from "./privetRoute/NotLoginUser";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route element={<RouteLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route element={<NotLoginUser />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
