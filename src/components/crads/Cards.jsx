import { useNavigate } from "react-router-dom";

const Cards = ({ val, deleteSingleBlog, index }) => {

    const navigate = useNavigate();

  return (
    <section className="w-[12rem] rounded-sm border border-gray-200 shadow-md">
      <div className="h-full w-full rounded-sm bg-white shadow-md">
        <div>
          <img
            src={val.imgURL}
            alt="img not found"
            className="h-25 w-full rounded-t-sm"
          />
        </div>
        <div className="flex flex-col flex-wrap gap-1 overflow-hidden p-3 text-start text-wrap shadow-xl">
          <div className="max-h-8 max-w-[90%] overflow-hidden text-nowrap overflow-ellipsis">
            <h1 className="overflow-hidden text-sm font-medium text-nowrap overflow-ellipsis">
              <b>Title</b> : {val.title}
            </h1>
          </div>
          <div>
            <p className="text-xs">
              <b>Created By</b> : {val.by}
            </p>
          </div>
          <div className="max-w-60">
            <p className="max-h-12 min-h-12 max-w-60 overflow-hidden text-xs text-wrap break-all overflow-ellipsis whitespace-pre-wrap">
              <b>Content</b> : {val.content}
            </p>
          </div>
          <div className="mt-2 flex justify-between">
            <button
              className="rounded-sm border bg-blue-500 p-px px-2 text-white hover:bg-blue-600"
              onClick={() => {
                navigate("/createblog", {
                  state: {
                    heading: "Edit blog post",
                    pTag: "Update your blog post content",
                    button: "Save Changes",
                    val,
                    index: index,
                  },
                });
              }}
            >
              Edit
            </button>
            <button
              className="rounded-sm border bg-red-500 p-px px-1 text-white hover:bg-red-600"
              onClick={() => {
                deleteSingleBlog(index);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
