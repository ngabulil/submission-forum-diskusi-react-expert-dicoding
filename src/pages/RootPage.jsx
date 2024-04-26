import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RootPage = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const history = useLocation();
  useEffect(() => {
    if (isLogin && ["/login", "/register"].includes(history.pathname)) {
      navigate("/");
    }
  }, [history])
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootPage;
