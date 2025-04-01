import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogData, fetchBlogData } from "../slices/BlogSlices";
import { Navigate, useNavigate } from "react-router-dom";
import Cards from "../components/crads/Cards";
import { Pagination } from "@mui/material";
import { setIsAdminLoggedIn, setLoggedInUser } from "../slices/UserSlice";

const AdminPanel = () => {
  const blogData = useSelector((state) => state.blogInfo.blogs);
  const BLOGS_PER_PAGE = 8;
  const TOTAL_PAGES = Math.ceil(blogData.length / BLOGS_PER_PAGE);
  const adminList = useSelector((state) => state.userInfo.adminList);

  const [currentPage, setCurrentPage] = useState(1);
  let end = currentPage * BLOGS_PER_PAGE;
  let start = end - BLOGS_PER_PAGE;

  const isAdminLoggedIn = useSelector(
    (state) => state.userInfo.isAdminLoggedIn,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [view, setView] = useState(true);

  useEffect(() => {
    dispatch(fetchBlogData());
    let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUser) {
      if (adminList.includes(sessionStorageUser.email)) {
        dispatch(setIsAdminLoggedIn());
      }
      dispatch(setLoggedInUser(sessionStorageUser));
    }
  }, []);

  const deleteSingleBlog = (index) => {
    const blogDataCopy = [...blogData];
    dispatch(deleteBlogData(blogDataCopy[index].id));
  };

  const changeView = () => {
    setView(!view);
  };

  const getCurrentPageNumber = (_, currentPageNO) => {
    setCurrentPage(currentPageNO);
  };

  return (
    <>
      {isAdminLoggedIn ? (
        <section className="p-5">
          <div className="align-center flex flex-col gap-15">
            <div className="flex justify-end">
              <button
                className="rounded-sm border bg-blue-500 p-2 text-white shadow-md hover:bg-blue-600"
                onClick={changeView}
              >
                {view ? "Grid View" : "Table View"}
              </button>
            </div>
            {view ? (
              <div className="flex justify-center">
                <table className="h-fit w-[95%] overflow-hidden rounded-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-3 px-6 font-semibold">
                        Image
                      </th>
                      <th className="border border-gray-300 p-3 px-6 font-semibold">
                        Title
                      </th>
                      <th className="border border-gray-300 p-3 px-6 font-semibold">
                        Created by
                      </th>
                      <th className="border border-gray-300 p-3 px-6 font-semibold">
                        Content
                      </th>
                      <th className="border border-gray-300 p-3 px-6 font-semibold">
                        Update/Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...blogData].slice(start, end).map((val, i) => (
                      <tr key={i} className="text-center even:bg-gray-100">
                        <td className="border border-gray-300 p-2">
                          <div className="flex justify-center">
                            <img
                              src={val?.imgURL}
                              alt="image not found"
                              width={70}
                              height={100}
                            />
                          </div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {val?.title}
                        </td>
                        <td className="border border-gray-300 p-2">{val?.by}</td>
                        <td className="h-1 max-w-xl overflow-hidden border border-gray-300 p-2 px-2 text-nowrap overflow-ellipsis">
                          {val?.content}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            className="cursor-pointer rounded-sm border bg-blue-500 p-1 px-2 text-white hover:bg-blue-600"
                            onClick={() => {
                              navigate("/createblog", {
                                state: {
                                  heading: "Edit blog post",
                                  pTag: "Update your blog post content",
                                  button: "Save Changes",
                                  val,
                                  index: i + start,
                                },
                              });
                            }}
                          >
                            Edit
                          </button>{" "}
                          <button
                            className="cursor-pointer rounded-sm border bg-red-500 p-1 px-2 text-white hover:bg-red-600"
                            onClick={() => deleteSingleBlog(i + start)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-5 pl-14">
                {[...blogData].slice(start, end).map((val, i) => (
                  <Cards
                    key={i}
                    val={val}
                    index={i + start}
                    deleteSingleBlog={deleteSingleBlog}
                  />
                ))}
              </div>
            )}

            <Pagination
              page={currentPage}
              count={TOTAL_PAGES}
              variant="outlined"
              shape="rounded"
              color="primary"
              className="self-center"
              onChange={getCurrentPageNumber}
            />
          </div>
        </section>
      ) : (
        <>
          <h1 className="mt-[10%] text-center text-2xl font-semibold">
            Only admins can access this page
          </h1>
        </>
      )}
    </>
  );
};

export default AdminPanel;
