import React from "react";
import { useMediaQuery } from "react-responsive";

const DetailPost = (props) => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const { urlImg, username, community, title, text, filteredCommentCount } =
    props;
  return (
    <div>
      {isPC ? (
        <div>
          <div className=" w-[1000px] h-[80px] flex items-center">
            <div className=" w-[300px] flex items-center justify-between">
              <img
                src={urlImg}
                alt=""
                className=" w-[80px] h-[80px] rounded-full object-cover"
              />
              <div className=" w-[200px]">
                <h1 className=" text-2xl font-medium">{username}</h1>
              </div>
            </div>
          </div>
          <div className="w-[1000px] flex items-center h-[60px]">
            <div className=" w-[80px] h-[40px] flex justify-center items-center rounded-3xl bg-[#f3f3f3] text-[#4A4A4A]">
              <h1>{community}</h1>
            </div>
          </div>
          <div className=" w-[1000px] h-[40px] text-3xl flex items-center  mt-4">
            <h1>{title}</h1>
          </div>
          <div className=" w-[1000px] mt-4 flex flex-col text-[#191919]">
            <h1 className=" overflow-y-auto max-h-[200px] whitespace-normal break-words">
              {text}
            </h1>
          </div>
          <div className=" h-[25px] w-[1000px] my-4 text-[#939494]">
            <div className=" w-[120px] font-semibold h-[25px] flex justify-between items-center ">
              <img
                src="/comment-svgrepo-com.svg"
                alt=""
                className=" w-[25px] h-[25px]"
              />
              <h1>{filteredCommentCount}</h1>
              <h1>Comment</h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" w-full flex flex-col items-start  mt-10">
            <div className=" w-full h-[80px] flex items-center">
              <div className=" w-[300px] flex items-center justify-between">
                <img
                  src={urlImg}
                  alt=""
                  className=" w-[80px] h-[80px] rounded-full object-cover"
                />
                <div className=" w-[200px]">
                  <h1 className=" text-2xl font-medium">{username}</h1>
                </div>
              </div>
            </div>
            <div className="w-[1000px] flex items-center h-[60px]">
              <div className=" w-[80px] h-[40px] flex justify-center items-center rounded-3xl bg-[#f3f3f3] text-[#4A4A4A]">
                <h1>{community}</h1>
              </div>
            </div>
            <div className=" w-[1000px] h-[40px] text-3xl flex items-center  mt-4">
              <h1>{title}</h1>
            </div>
            <div className=" w-[1000px] mt-4 text-xl flex flex-col text-[#191919]">
              <h1 className=" overflow-y-auto max-h-[200px] whitespace-normal break-words">
                {text}
              </h1>
            </div>
            <div className=" h-[25px] w-[1000px] my-4 text-[#939494]">
              <div className=" w-[120px] font-semibold h-[25px] flex justify-between items-center ">
                <img
                  src="/comment-svgrepo-com.svg"
                  alt=""
                  className=" w-[25px] h-[25px]"
                />
                <h1>{filteredCommentCount}</h1>
                <h1>Comment</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPost;
