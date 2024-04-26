import { useDispatch, useSelector } from "react-redux";
import {
  getProfileAsyncAction,
  logoutAction,
} from "../states/authProfile/action";
import api from "../services/api";
import { Link } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { useEffect } from "react";

const Navbar = () => {
  const { profile, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    api.removeAccessToken();
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfileAsyncAction());
    }
  }, [isLogin]);
  return (
    <header className="sticky top-0">
      <LoadingBar />
      <nav className="flex bg-slate-400 justify-between items-center">
        <Link className="p-4 bg-slate-100" to={"/"} data>
          Forum
        </Link>
        <Link className="p-4 bg-slate-100"  to={"/leaderboards"}>Leaderboars</Link>
        {isLogin ? (
          <div className="flex items-center gap-6">
            <div className="flex">
              <img src={profile?.avatar} alt="" />
              <div>
                <p>{profile?.name}</p>
                <p>{profile?.email}</p>
              </div>
            </div>
            <p className="p-4 bg-slate-100 cursor-pointer" onClick={handleLogout}>Logout</p>
          </div>
        ) : (
          <Link className="p-4 bg-slate-100"  to={"/login"}>login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
