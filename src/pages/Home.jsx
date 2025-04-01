import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { fetchBlogData } from "../slices/BlogSlices";
import { setIsAdminLoggedIn, setLoggedInUser } from "../slices/UserSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const blogData = useSelector((state) => state.blogInfo.blogs);
  const adminList = useSelector((state) => state.userInfo.adminList);

  useEffect(() => {
    let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUser) {
      if (adminList.includes(sessionStorageUser.email)) {
        dispatch(setIsAdminLoggedIn());
      }
      dispatch(setLoggedInUser(sessionStorageUser));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBlogData());
    setData(blogData);
  }, [blogData.length]);

  

  return (
    <>
      <section className="flex justify-center">
        {data.length ? (
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 p-15 text-center">
            {data
              .slice()
              .reverse()
              .map((val, i) => (
                <div
                  className="max-h-fit min-h-60 w-80 rounded-md border border-gray-400 bg-white"
                  key={i}
                >
                  <div>
                    <img
                      src={val.imgURL}
                      alt=""
                      className="h-50 w-full rounded-t-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-wrap gap-4 overflow-hidden p-5 text-start text-wrap shadow-xl">
                    <div className="max-h-8 overflow-hidden text-wrap">
                      <h1 className="text-2xl font-bold">
                        {data.length - i + ". "}
                        {val.title}
                      </h1>
                    </div>
                    <div className="text-gray-400">
                      <p>
                        By {val.by} - {val.date}
                      </p>
                    </div>
                    <div className="w-full text-wrap">
                      <article className="h-25 max-h-25 w-full overflow-hidden text-wrap overflow-ellipsis">
                        {val.content}
                      </article>
                    </div>
                    <div>
                      <button
                        className="text-blue-600"
                        onClick={() => {
                          navigate("/readblog", {
                            state: { val, index: data.length - i - 1 },
                          });
                        }}
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex h-screen items-center">
            <button
              className="rounded-sm bg-blue-500 p-3 font-semibold text-white shadow-sm shadow-gray-500 transition-all duration-200 hover:scale-102 hover:shadow-md"
              onClick={() => {
                navigate("/createblog", {
                  state: {
                    heading: "Create New Blog Post",
                    pTag: "Share Your thoughts and ideas with the world",
                    button: "Publish post",
                  },
                });
              }}
            >
              Create Your First Blog
            </button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Home;
