import React from "react";
import { useMediaQuery } from "react-responsive";

const DetailComment = (props) => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const {
    handleOpenComment,
    isComment,
    comment,
    setComment,
    handleAddComment,
    error,
    commentOpent,
  } = props;
  return (
    <div>
      {isPC ? (
        <div className=" w-[700px] h-[50px]  text-[#49a569] relative">
          <button
            onClick={handleOpenComment}
            className=" w-[150px] h-[50px] rounded-lg border-2 border-[#49a569] "
          >
            Add Comments
          </button>

          {isComment && (
            <div className=" w-[700px]  flex flex-col h-[200px]  absolute left-0 -top-2">
              <div className=" w-[700px] h-[300px] border-2 border-[#dadada] rounded-lg overflow-hidden ">
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What' s on your mind..."
                  className=" w-[997px] h-[200px] outline-none flex p-2 resize-none"
                />
              </div>
              <div className=" mt-4 w-[700px] h-[70px]  flex justify-end items-center">
                <div className=" w-[220px] flex justify-between">
                  <button
                    onClick={handleOpenComment}
                    className=" h-[40px] w-[100px] bg-[#FFFFFF] rounded-lg border-2 border-[#49a569] text-[#49a569]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddComment}
                    className=" h-[40px] w-[100px] bg-[#49a569] rounded-lg text-[#FFFFFF]"
                  >
                    Post
                  </button>
                </div>
              </div>
              {error && (
                <div className=" relative left-52 -top-80 w-[600px] h-[600px] text-5xl font-extrabold flex justify-center items-center rounded-lg text-red-600 bg-[#bbc2c0]">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className=" w-[1000px] h-[50px] mt-8 text-[#49a569] relative">
          <button
            onClick={handleOpenComment}
            className=" w-[150px] h-[50px] rounded-lg border-2 border-[#49a569] "
          >
            Add Comments
          </button>

          {isComment && (
            <div className=" p-4 w-[95vw] h-[450px] bg-[#FFFFFF] flex flex-col justify-between rounded-xl absolute z-20 -left-2 -top-40 ">
              <div
                id="head"
                className=" flex justify-between min-h-[60px] items-end relative"
              >
                <h1 className=" text-[#191919] text-4xl font-medium">
                  Add Comments
                </h1>
                <div className=" flex min-h-[60px] items-start">
                  <button onClick={handleOpenComment}>
                    <img
                      src="/post/close-md-svgrepo-com.svg"
                      alt=""
                      className=" w-[35px] h-[35px]"
                    />
                  </button>
                </div>
              </div>
              <div className="  h-[200px] mt-4 flex justify-center bg-red-400 border-2 mb-4 border-[#dadada] rounded-lg overflow-hidden ">
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What' s on your mind..."
                  className=" w-full  h-[200px] outline-none flex p-2 resize-none text-[#191919]"
                />
              </div>
              <div className=" mt-4 h-[100px] w-full flex justify-end items-center">
                <div className=" w-full h-[100px] flex flex-col justify-between">
                  <button
                    onClick={handleOpenComment}
                    className=" h-[40px] w-full bg-[#FFFFFF] rounded-lg border-2 border-[#49a569] text-[#49a569]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddComment}
                    className=" h-[40px] w-full bg-[#49a569] rounded-lg text-[#FFFFFF]"
                  >
                    Post
                  </button>
                </div>
              </div>

              {error && (
                <div className=" relative left-52 -top-80 w-[600px] h-[600px] text-5xl font-extrabold flex justify-center items-center rounded-lg text-red-600 bg-[#bbc2c0]">
                  {error}
                </div>
              )}
            </div>
          )}
          {commentOpent && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={handleAddComment}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DetailComment;
