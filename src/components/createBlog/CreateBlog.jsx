import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  postBlogData,
  updateBlog,
  updateBlogData,
} from "../../slices/BlogSlices";
import { toast, ToastContainer } from "react-toastify";
import Preview from "../previewpage/Preview";

const CreateBlog = () => {
  const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn);
  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  console.log("start in createblog");
  console.log(state)

  const [data, setData] = useState({
    id:state?.val?.id,
    title: state?.val?.title || "",
    imgURL: state?.val?.imgURL || "",
    content: state?.val?.content || "",
    by: state?.val?.by || loggedInUser[0]?.username,
    email: state?.val?.email || loggedInUser[0]?.email,
    date:
      state?.val?.date ||
      months[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear(),
  });

  const [isEmptyStatus, setIsEmptyStatus] = useState({
    title: false,
    content: false,
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

  const handleSubmit = () => {
    if (data.title && data.content) {
      // dispatch(setBlogs(data));
      dispatch(postBlogData(data));
      toast.success("post created", { autoClose: 1000, hideProgressBar: true });

      setTimeout(() => {
        navigate("/");
      }, 1100);
    } else if (!data.title) {
      toast.error("Please enter the title");
      setIsEmptyStatus((prev) => {
        return {
          ...prev,
          title: true,
        };
      });
    } else {
      toast.error("Content field is emplty");
      setIsEmptyStatus((prev) => {
        return {
          ...prev,
          content: true,
        };
      });
    }
  };

  const updateSingleBlog = () => {
    dispatch(updateBlog({ data, index: state.index }));
    dispatch(updateBlogData(data ));
    toast.success("Updated successfully", { hideProgressBar: true });
    setTimeout(() => {
      navigate("/");
    }, 1300);
  };

  return (
    <>
      {isLoggedIn ? (
        <section className="flex h-[100vh] w-full flex-wrap items-center justify-around p-9">
          <ToastContainer theme="dark" />
          <div className="flex w-140 flex-col flex-wrap gap-3 rounded-sm border border-gray-300 p-7 shadow-md">
            <div>
              <h1 className="text-2xl font-bold">{state.heading}</h1>
              <p className="text-gray-400">{state.pTag}</p>
            </div>
            <div>
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                className={`input ${isEmptyStatus.title && "border-red-500"}`}
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                onBlur={isEmpty}
                placeholder="Enter a Title"
              />
            </div>
            <div>
              <label className="label" htmlFor="imgURL">
                Cover Image URL (Optional)
              </label>
              <input
                className="input"
                type="text"
                id="imgURL"
                name="imgURL"
                value={data.imgURL}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="label" htmlFor="content">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                value={data.content}
                onChange={handleChange}
                onBlur={isEmpty}
                className={`input ${isEmptyStatus.content && "border-red-500"} min-h-40`}
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                className="h-10 w-20 rounded-sm border font-semibold hover:bg-gray-100"
                onClick={() => {
                  navigate("/");
                }}
              >
                cancel
              </button>
              <button
                className="h-10 w-28 rounded-sm border border-gray-300 bg-blue-600 font-semibold text-white hover:bg-blue-700"
                onClick={() => {
                  state.val ? updateSingleBlog() : handleSubmit();
                }}
              >
                {state.button}
              </button>
            </div>
          </div>
          <div>
            <Preview data={data} />
          </div>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default CreateBlog;
