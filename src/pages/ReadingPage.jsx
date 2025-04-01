import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogData } from "../slices/BlogSlices";
import { toast, ToastContainer } from "react-toastify";

const ReadingPage = () => {
  const location = useLocation();
  const { val, index } = location.state || {};

  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);
  const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn);
  const blogData = useSelector((state) => state.blogInfo.blogs);
  const dispatch = useDispatch();



  const isCreatedByCurrentUser = loggedInUser[0]?.email === val?.email;

  const deleteSingleBlog = () => {
    const blogDataCopy = [...blogData];
    toast.warning("deleting your blog", { pauseOnHover: false });
    dispatch(deleteBlogData(blogDataCopy[index].id));
  };

  return (
    <>
      {isLoggedIn ? (
        <section className="flex w-full flex-wrap items-center justify-center p-10 whitespace-pre-wrap">
          <ToastContainer autoClose={1000} limit={1} theme="dark" />
          <div className="size-8/10 max-w-fit rounded-sm border border-gray-300 shadow-md">
            <div>
              <img
                className="w-full rounded-t-md"
                src={val.imgURL}
                alt="image not found"
              />
              <div className="flex w-[100%] flex-col flex-wrap gap-4 p-9 text-wrap">
                <div>
                  <h1 className="text-3xl font-bold">{val.title}</h1>
                </div>
                <div className="flex w-[100%] flex-wrap items-center justify-between">
                  <p className="text-gray-400">
                    By {val.by} - {val.date}
                  </p>
                  <div>
                    {isCreatedByCurrentUser && (
                      <div className="flex gap-5">
                        <button
                          className="flex gap-1 rounded-sm border p-1 px-3 font-medium hover:bg-gray-100"
                          onClick={() => {
                            navigate("/createblog", {
                              state: {
                                heading: "Edit blog post",
                                pTag: "Update your blog post content",
                                button: "Save Changes",
                                val,
                                index,
                              },
                            });
                          }}
                        >
                          <MdEdit className="mt-1" />
                          <span>Edit</span>
                        </button>
                        <button
                          className="flex gap-1 rounded-sm border bg-red-500 p-1 px-3 font-normal text-white hover:bg-red-600"
                          onClick={deleteSingleBlog}
                        >
                          <ImBin className="mt-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="max-w-full text-wrap break-words">
                  {val.content}
                </div>
                <div className="text-center">********</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default ReadingPage;
