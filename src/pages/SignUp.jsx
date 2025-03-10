import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setUserData } from "../slices/UserSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [isEmptyStatus, setIsEmptyStatus] = useState({
    username: false,
    email: false,
    password: false,
    confirmpassword: false,
  });

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username && data.email && data.password && data.confirmpassword) {
      if (data.password === data.confirmpassword) {
        dispatch(
          setUserData({
            username: data.username.trim(),
            email: data.email.trim(),
            password: data.password.trim(),
          }),
        );
        navigate("/");
      } else {
        toast.error("confirm password should be same as password");
      }
    } else {
      setIsEmptyStatus({
        username: true,
        email: true,
        password: true,
        confirmpassword: true,
      });
      toast.error("all fields should be filled");
    }
  };

  return (
    <section className="flex w-full items-center justify-center p-10">
      <ToastContainer theme="dark" />
      <form action="">
        <div className="flex min-w-md flex-col justify-center gap-5 rounded-md border border-gray-300 p-10 shadow-md">
          <div>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="mt-2 text-gray-400">
              Enter your details to create a new account
            </p>
          </div>
          <div>
            <label className="label" htmlFor="username">
              Full Name
            </label>
            <input
              className={`input ${isEmptyStatus.username && "border-red-500"}`}
              type="text"
              name="username"
              id="username"
              placeholder="Your name"
              value={data.username}
              onChange={handleChange}
              onBlur={isEmpty}
            />
          </div>
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className={`input ${isEmptyStatus.email && "border-red-500"}`}
              type="text"
              name="email"
              id="email"
              placeholder="example@gmail.com"
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
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              onBlur={isEmpty}
            />
          </div>
          <div>
            <label className="label" htmlFor="confirmpassword">
              Confirm Password
            </label>
            <input
              className={`input ${isEmptyStatus.confirmpassword && "border-red-500"}`}
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={data.confirmpassword}
              onChange={handleChange}
              onBlur={isEmpty}
            />
          </div>
          <div>
            <button
              className="h-11 w-full rounded-sm border bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className="text-center">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-700">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
