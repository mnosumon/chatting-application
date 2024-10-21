import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login/Login";

export default function LoginUser() {
  const user = useSelector((state) => state.user.value);
  return user ? <Outlet /> : <Login />;
}
