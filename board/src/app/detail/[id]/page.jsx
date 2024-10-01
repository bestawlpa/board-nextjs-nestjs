"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import SidebarLeft from "@/app/component/SidebarLeft";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Detail({ params }) {
  const { data: session } = useSession();
  const isPC = useMediaQuery({ minWidth: 1024 });
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [post, setPost] = useState([]);
  const [fetchComment, setFetchComment] = useState([]);
  const [isComment, setisComment] = useState(false);
  const [commentOpent, setCommentOpent] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [filteredCommentCount, setFilteredCommentCount] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/` + params.id);
        const data = await response.json();
        console.log(data, "data");
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  const handleOpenComment = () => {
    setisComment(!isComment);
    setCommentOpent(!commentOpent);
  };

  const getComment = async () => {
    try {
      const response = await fetch(`${apiUrl}/comments`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("comment", data);

      const filterComment = data.filter((e) => e.postId == params.id);

      setFilteredCommentCount(filterComment.length);
      setFetchComment(filterComment);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    if (comment === "") {
      setError("You didn't type anything.");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user._id,
          username: session.user.username,
          urlImg: session.user.urlImg,
          postId: params.id,
          comment: comment,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add comment");
      }
      await getComment();
      handleOpenComment();
      setComment("");
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div>
      {isPC ? (
        <div className="w-screen h-screen  flex ">
          <SidebarLeft />
          <div className=" w-full min-h-full bg-[#FFFFFF] pb-32 pt-8 flex flex-col justify-center items-center overflow-y-auto">
            <div className=" w-[1000px]  h-full bg-[#FFFFFF]">
              <div className=" h-[60px] ">
                <Link href={"/"}>
                  <div className=" w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#d8e9e4]">
                    <img
                      src="/detail/arrow-left-svgrepo-com.svg"
                      alt=""
                      className=" w-[40px] h-[40px]"
                    />
                  </div>
                </Link>
              </div>

              <div className=" w-[1000px] flex flex-col items-start  py-4 mt-10">
                <div className=" w-[1000px] h-[80px] flex items-center">
                  <div className=" w-[300px] flex items-center justify-between">
                    <img
                      src={post.urlImg}
                      alt=""
                      className=" w-[80px] h-[80px] rounded-full object-cover"
                    />
                    <div className=" w-[200px]">
                      <h1 className=" text-2xl font-medium">{post.username}</h1>
                    </div>
                  </div>
                </div>
                <div className="w-[1000px] flex items-center h-[60px]">
                  <div className=" w-[80px] h-[40px] flex justify-center items-center rounded-3xl bg-[#f3f3f3] text-[#4A4A4A]">
                    <h1>{post.community}</h1>
                  </div>
                </div>
                <div className=" w-[1000px] h-[40px] text-3xl flex items-center  mt-4">
                  <h1>{post.title}</h1>
                </div>
                <div className=" w-[1000px] mt-4 flex flex-col text-[#191919]">
                  <h1 className=" overflow-y-auto max-h-[200px] whitespace-normal break-words">
                    {post.text}
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

              <div className=" w-[1000px] h-[50px]  text-[#49a569] relative">
                <button
                  onClick={handleOpenComment}
                  className=" w-[150px] h-[50px] rounded-lg border-2 border-[#49a569] "
                >
                  Add Comments
                </button>

                {isComment && (
                  <div className=" w-[1000px]  flex flex-col h-[200px]  absolute left-0 -top-2">
                    <div className=" w-[1000px] h-[300px] border-2 border-[#dadada] rounded-lg overflow-hidden ">
                      <textarea
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What' s on your mind..."
                        className=" w-[997px] h-[200px] outline-none flex p-2 resize-none"
                      />
                    </div>
                    <div className=" mt-4 w-[1000px] h-[70px]  flex justify-end items-center">
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

              <div
                id="comment"
                className=" w-[1000px] mt-36 pb-32 bg-[#FFFFFF]"
              >
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
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-screen h-screen overflow-y-auto p-4">
          <div className=" ">
            <div className=" h-[60px]">
              <Link href={"/"}>
                <div className=" w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#d8e9e4]">
                  <img
                    src="/detail/arrow-left-svgrepo-com.svg"
                    alt=""
                    className=" w-[40px] h-[40px]"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className=" w-full flex flex-col items-start  mt-10">
            <div className=" w-full h-[80px] flex items-center">
              <div className=" w-[300px] flex items-center justify-between">
                <img
                  src={post.urlImg}
                  alt=""
                  className=" w-[80px] h-[80px] rounded-full object-cover"
                />
                <div className=" w-[200px]">
                  <h1 className=" text-2xl font-medium">{post.username}</h1>
                </div>
              </div>
            </div>
            <div className="w-[1000px] flex items-center h-[60px]">
              <div className=" w-[80px] h-[40px] flex justify-center items-center rounded-3xl bg-[#f3f3f3] text-[#4A4A4A]">
                <h1>{post.community}</h1>
              </div>
            </div>
            <div className=" w-[1000px] h-[40px] text-3xl flex items-center  mt-4">
              <h1>{post.title}</h1>
            </div>
            <div className=" w-[1000px] mt-4 text-xl flex flex-col text-[#191919]">
              <h1 className=" overflow-y-auto max-h-[200px] whitespace-normal break-words">
                {post.text}
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

          <div id="comment" className=" px-4 mt-40 pb-32 bg-[#FFFFFF]">
            {fetchComment.map((e) => (
              <div
                key={e._id}
                className=" w-[1000px] h-[150px] my-10 text-[#191919] "
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
        </div>
      )}
    </div>
  );
}
