"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import SidebarLeft from "@/app/component/SidebarLeft";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DetailPost from "@/app/component/page/Detail/DetailPost";
import DetailComment from "@/app/component/page/Detail/DetailComment";

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
                <DetailPost
                  urlImg={post.urlImg}
                  username={post.username}
                  community={post.community}
                  title={post.title}
                  text={post.text}
                  filteredCommentCount={filteredCommentCount}
                />
              </div>
              <DetailComment
                handleOpenComment={handleOpenComment}
                isComment={isComment}
                comment={comment}
                setComment={setComment}
                handleAddComment={handleAddComment}
                error={error}
              />

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
          <DetailPost
            urlImg={post.urlImg}
            username={post.username}
            community={post.community}
            title={post.title}
            text={post.text}
            filteredCommentCount={filteredCommentCount}
          />
          <DetailComment
            handleOpenComment={handleOpenComment}
            isComment={isComment}
            comment={comment}
            setComment={setComment}
            handleAddComment={handleAddComment}
            error={error}
            commentOpent={commentOpent}
          />
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
        </div>
      )}
    </div>
  );
}
