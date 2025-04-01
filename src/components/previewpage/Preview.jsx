import { defaultImgUrl } from "../../slices/BlogSlices";

const Preview = ({ data }) => {

  return (
    <section>
      <div className="mb-2 font-medium text-gray-400">Preview</div>
      <div className="w-2xs rounded-sm border border-gray-400 bg-white shadow-md">
        <div>
          <img
            src={data.imgURL === "" ? defaultImgUrl : data.imgURL}
            alt="img not found"
            className="h-40 w-full rounded-t-sm"
          />
        </div>
        <div className="flex flex-col flex-wrap gap-2 overflow-hidden p-5 text-start text-wrap shadow-xl">
          <div className="max-h-8 max-w-60">
            <h1 className="overflow-hidden text-xl font-medium text-nowrap overflow-ellipsis">
              {data.title === "" ? "Title" : data.title}
            </h1>
          </div>
          <div>
            <p className="text-xs text-gray-400">
              By {data.by} - {data.date}
            </p>
          </div>
          <div className="max-w-60">
            <p className="max-h-40 max-w-60 overflow-hidden text-xs text-wrap break-all overflow-ellipsis whitespace-pre-wrap">
              {data.content}
            </p>
            <p className="mt-2 text-center">******</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
