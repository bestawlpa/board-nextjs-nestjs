import React from "react";
import { useMediaQuery } from "react-responsive";

const FetchComment = (props) => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const { fetchComment } = props;

  return (
    <div>
      {isPC ? (
        <div id="comment" className=" w-[1000px] mt-36 pb-32 bg-[#FFFFFF]">
          {fetchComment.map((e) => (
            <div
              key={e._id}
              className=" w-[1000px] h-[150px] my-10 text-[#191919] "
            >
              <div className=" w-[300px] h-[70px] ">
                <div className=" flex items-center justify-between">
                  <img
                    src={e.urlImg}
                    alt=""
                    className=" w-[70px] h-[70px] rounded-full object-cover shadow-xl"
                  />
                  <div className=" w-[200px] text-3xl font-semibold">
                    <h1>{e.username}</h1>
                  </div>
                </div>
              </div>

              <div className=" w-[1000px] [80px] flex justify-end">
                <div className=" w-[910px] h-[100px] ">
                  <h1 className=" text-xl overflow-y-auto max-h-[160px] whitespace-normal break-words">
                    {e.comment}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="comment" className=" px-4 mt-40 pb-32 bg-[#FFFFFF]">
          {fetchComment.map((e) => (
            <div
              key={e._id}
              className=" w-[1000px] h-[150px] my-2 text-[#191919] "
            >
              <div className=" w-[280px] h-[70px] ">
                <div className=" flex items-center justify-between">
                  <img
                    src={e.urlImg}
                    alt=""
                    className=" w-[60px] h-[60px] rounded-full object-cover shadow-xl"
                  />
                  <div className=" w-[200px] text-3xl font-semibold">
                    <h1>{e.username}</h1>
                  </div>
                </div>
              </div>

              <div className=" w-[1000px] [80px] flex justify-end">
                <div className=" w-[920px] h-[100px] ">
                  <h1 className=" text-xl overflow-y-auto max-h-[160px] whitespace-normal break-words">
                    {e.comment}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchComment;
