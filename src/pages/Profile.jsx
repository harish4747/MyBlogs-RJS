import { useSelector } from "react-redux";
import { IoIosMailOpen } from "react-icons/io";
import { Navigate } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Profile = () => {
  const defaultProfileImage =
    "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png";

  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);
  const isAdminLoggedIn = useSelector(
    (state) => state.userInfo.isAdminLoggedIn,
  );

  return (
    <section className="flex h-screen w-screen items-center justify-center">
      {loggedInUser.length === 1 ? (
        <div className="min-h-40 rounded-sm border border-gray-400 p-4 shadow-xl">
          <div className="flex flex-col gap-4">
            <img
              src={defaultProfileImage}
              className="h-35 w-35 self-center rounded-full border"
              alt=""
            />
            <div className="flex flex-col gap-3">
              <h1 className="text-center text-xl font-medium">
                {loggedInUser[0]?.username}
              </h1>
              <hr />
              <div>
                <div className="mt-4 flex">
                  <MdOutlineAdminPanelSettings
                    size={20}
                    fill="gray"
                    className="mt-0.5 mr-1"
                  />
                  <p className="text-gray-600">
                    Status : {isAdminLoggedIn ? "Admin" : "User"}
                  </p>
                </div>
                <div className="mt-4 flex">
                  <IoIosMailOpen
                    size={20}
                    fill="gray"
                    className="mt-0.5 mr-1"
                  />
                  <p className="text-gray-600">{loggedInUser[0]?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </section>
  );
};

export default Profile;
