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
import Message from "./pages/message/Message";
import Profile from "./pages/profile/Profile";
import AllUser from "./components/home/AllUser";
import FriendRequest from "./components/home/FriendRequest";
import Friends from "./components/home/Friends";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route element={<RouteLayout />}>
            <Route path="/message" element={<Message />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />}>
              <Route index element={<AllUser />} />
              <Route path="/alluser" element={<AllUser />} />
              <Route path="/friendrequest" element={<FriendRequest />} />
              <Route path="/sentmessage" element={<Friends />} />
            </Route>
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
