import { GoHomeFill } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slices/UserSlice";
import { TbLogout2 } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn);
  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);
  const isAdminLoggedIn = useSelector(
    (state) => state.userInfo.isAdminLoggedIn,
  );

  return (
    <section className="h-[13vh] w-full border border-gray-100 bg-[#fcfeff] shadow-md">
      <div className="flex h-full items-center justify-between p-10">
        <div
          className="flex cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <abbr title="Go to Home Page">
            <span>
              <GoHomeFill className="mt-2" size={27} />
            </span>
          </abbr>
          <h1 className="text-3xl font-bold">MyBlogs</h1>
        </div>
        <div className="flex gap-5">
          {isLoggedIn ? (
            <>
              {isAdminLoggedIn && (
                <button
                  className="w-30 rounded-sm border border-gray-300 bg-blue-600 font-semibold text-white hover:bg-blue-700"
                  onClick={() => {
                    navigate("/admin-panel");
                  }}
                >
                  Admin panel
                </button>
              )}
              <button
                onClick={() => {
                  navigate("/createblog", {
                    state: {
                      heading: "Create New Blog Post",
                      pTag: "Share Your thoughts and ideas with the world",
                      button: "Publish post",
                    },
                  });
                }}
                className="flex cursor-pointer gap-1 rounded-xs border border-gray-200 p-1.5 hover:bg-gray-200"
              >
                <HiOutlinePencilAlt className="mt-1.5" />
                New Post
              </button>
              <div className="group relative mt-1.5 cursor-pointer">
                <FaUserCircle size={25} />
                <div className="invisible absolute top-7 -left-12 min-h-30 min-w-24 translate-y-5 rounded-sm border border-gray-300 bg-white p-2 shadow-lg duration-200 group-hover:visible group-hover:translate-y-0 group-hover:transition-all">
                  <ul className="flex h-full flex-col gap-2 text-wrap">
                    <li className="flex gap-2 hover:bg-gray-100">
                      <FaRegUser className="mt-1" />
                      <NavLink to="/profile">Profile</NavLink>
                    </li>

                    <li className="flex gap-2 hover:bg-gray-100">
                      <TbLogout2 className="mt-1.5" />
                      <NavLink
                        onClick={() => {
                          dispatch(logoutUser());
                          sessionStorage.removeItem("user");
                        }}
                      >
                        logout
                      </NavLink>
                    </li>
                    <hr />
                    <li className="text-gray-600">
                      {loggedInUser[0]?.username}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  className="h-10 w-20 rounded-xs border border-gray-300 bg-blue-600 font-semibold text-white hover:bg-blue-700"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  className="h-10 w-20 rounded-xs border font-semibold hover:bg-gray-100"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NavBar;
