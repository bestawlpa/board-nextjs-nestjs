import React from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const HomeContent = (props) => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const { fetchPost } = props;
  return (
    <div>
      {isPC ? (
        <div className="flex flex-col mb-32 rounded-3xl items-start justify-start w-full ">
          {fetchPost.map((e) => (
            <div key={e.id} className="w-full h-[210px] flex flex-col">
              <Link href={"/detail/" + e._id}>
                <div className=" w-full  flex flex-col p-4  border-[#bbc2c0] border-b-2 ">
                  <div className=" w-[170px] h-[50px]  flex justify-between">
                    <img
                      src={e.urlImg}
                      alt=""
                      className=" w-[50px] h-[50px] rounded-3xl object-cover"
                    />
                    <div className=" w-[110px] h-[50px] flex justify-start items-center text-lg font-normal text-[#939494]">
                      <h1>{e.username}</h1>
                    </div>
                  </div>

                  <div className=" h-[30px]  mt-2">
                    <div className=" w-[85px] h-[30px] rounded-3xl flex items-center justify-center bg-[#f3f3f3] text-[#4A4A4A]">
                      <h1>{e.community}</h1>
                    </div>
                  </div>

                  <div className=" h-[60px] text-[#101828] mt-2">
                    <div className=" h-[30px] flex items-center">
                      <h1 className=" font-semibold text-xl">{e.title}</h1>
                    </div>
                    <div className=" w-[856px] h-[30px] flex items-center overflow-hidden pr-1">
                      <h2 className="overflow-hidden text-ellipsis line-clamp-1 ">
                        {e.text}
                      </h2>
                    </div>
                  </div>

                  <div className=" h-[25px]  text-[#939494]">
                    <div className=" w-[120px] font-semibold h-[25px] flex justify-between items-center ">
                      <img
                        src="/comment-svgrepo-com.svg"
                        alt=""
                        className=" w-[25px] h-[25px]"
                      />
                      <h1>1</h1>
                      <h1>Comment</h1>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-full h-full bg-[#ffffff] rounded-xl overflow-hidden overflow-y-auto">
          {fetchPost.map((e) => (
            <div
              key={e.id}
              className=" w-full h-[280px] bg-[#FFFFFF] py-4 border-b-4 border-[#bbc2c0]"
            >
              <div className=" w-full px-4">
                <div className=" w-full h-[50px] ">
                  <div className=" flex h-full items-center justify-between  w-[190px]">
                    <Link
                      href={"/detail/" + e._id}
                      className=" flex items-center"
                    >
                      <img
                        src={e.urlImg}
                        alt=""
                        className=" w-[50px] h-[50px] rounded-full mr-4"
                      />
                      <div className=" w-[120px] h-full flex items-center text-[#939494] text-xl font-semibold">
                        <h1>{e.username}</h1>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className=" w-full h-[40px] my-4 ">
                  <div className=" w-[80px] h-[40px] flex items-center justify-center rounded-3xl bg-[#f3f3f3]">
                    <h1 className=" text-[#4a4a4a]">{e.community}</h1>
                  </div>
                </div>

                <div className=" w-full h-[40px] my-4 px-2 flex items-center ">
                  <h1 className=" text-2xl font-semibold">{e.title}</h1>
                </div>
                <div className=" w-full h-[30px] my-4 px-2 flex  ">
                  <h1 className=" text-xl font-medium overflow-clip">
                    {e.text}
                  </h1>
                </div>
              </div>

              <div className=" h-[25px] px-4 text-[#939494]">
                <div className=" w-[120px] font-semibold h-[25px] flex justify-between items-center ">
                  <img
                    src="/comment-svgrepo-com.svg"
                    alt=""
                    className=" w-[25px] h-[25px]"
                  />
                  <h1>1</h1>
                  <h1>Comment</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeContent;
