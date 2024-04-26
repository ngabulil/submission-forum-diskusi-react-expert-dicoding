import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsyncAction } from "../states/authProfile/action";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSUbmit = (e) => {
    e.preventDefault();
    dispatch(registerAsyncAction({ name, email, password }));
  };

  useEffect(() => {
    if (register) {
      navigate("/login");
    }
  });
  return (
    <div>
      <p className="text-2xl">Register page</p>
      <form onSubmit={handleSUbmit} className="flex flex-col">
        <label className="text-xl" htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={changeName}
        />
        <label className="text-xl"  htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={changeEmail}
        />
        <label className="text-xl"  htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={changePassword}
        />
        <button className="bg-blue-500" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
