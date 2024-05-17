import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsyncAction } from "../states/authProfile/action";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSUbmit = (e) => {
    e.preventDefault();
    dispatch(loginAsyncAction({ email, password }));
  };
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  });
  return (
    <div>
      <p className="text-2xl">login page</p>
      <form onSubmit={handleSUbmit} className="flex flex-col">
        <label className="text-xl" htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={changeEmail}
          data-cy="email"
        />
        <label className="text-xl" htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={changePassword}
          data-cy="password"
        />
        <button className="bg-blue-500" data-cy="button-login" type="submit">Login</button>
      </form>
      <p>dont have an account? register <Link to="/register">here</Link></p>
    </div>
  );
};

export default Login;
