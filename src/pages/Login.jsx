import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchUserData,
  setIsAdminLoggedIn,
  setLoggedInUser,
} from "../slices/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.userData);
  const adminList = useSelector((state) => state.userInfo.adminList);

  useEffect(() => {
    let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUser) {
      if (adminList.includes(sessionStorageUser.email)) {
        dispatch(setIsAdminLoggedIn());
      }
      dispatch(setLoggedInUser(sessionStorageUser));
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isEmptyStatus, setIsEmptyStatus] = useState({
    email: false,
    password: false,
  });

  const isEmpty = (e) => {
    if (!e.target.value) {
      setIsEmptyStatus((prev) => {
        return {
          ...prev,
          [e.target.name]: true,
        };
      });
    } else {
      setIsEmptyStatus((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
        };
      });
    }
  };

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value.trim(),
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (data.email && data.password) {
      let temp = user.findIndex((val) => val.email === data.email);
      if (temp !== -1) {
        if (user[temp].password === data.password) {
          if (adminList.includes(user[temp].email)) {
            dispatch(setIsAdminLoggedIn());
          }
          sessionStorage.setItem("user", JSON.stringify(user[temp]));
          dispatch(setLoggedInUser(user[temp]));
          navigate("/");
        } else {
          toast.error("wrong password");
        }
      } else {
        toast.error("User Not found");
      }
    } else {
      setIsEmptyStatus({
        email: true,
        password: true,
      });
      toast.error("all fields should be filled");
    }
  };

  return (
    <section className="flex h-fit w-full items-center justify-center p-10">
      <ToastContainer theme="dark" />
      <form action="">
        <div className="flex h-[85%] min-w-md flex-col justify-center gap-6 rounded-md border border-gray-300 p-10 shadow-md">
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="mt-2 text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className={`input ${isEmptyStatus.email && "border-red-500"}`}
              id="email"
              type="text"
              placeholder="example@gmail.com"
              name="email"
              value={data.email}
              onChange={handleChange}
              onBlur={isEmpty}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className={`input ${isEmptyStatus.password && "border-red-500"}`}
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              onBlur={isEmpty}
            />
          </div>
          <div>
            <button
              className="h-11 w-full rounded-sm border bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div>
            <p className="text-center">
              Don't have an account?
              <NavLink to="/signup" className="text-blue-600">
                {" "}
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
