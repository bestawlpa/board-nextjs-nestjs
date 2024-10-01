"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SidebarLeft from "../component/SidebarLeft.jsx";
import SidebarRight from "../component/SidebarRight.jsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link.js";

export default function Blog() {
  const [fetchPost, setFetchPost] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  // ใช้func create post
  const [isCreate, setIsCreate] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);
  const [selectCommunity, setSelectCommunity] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [addCommunity, setAddCommunity] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const isPC = useMediaQuery({ minWidth: 1024 });
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };

  //-- ใช้ใน func edit
  const [isEdit, setIsEdit] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editCommunity, setEditCommunity] = useState("");

  // ถ้าไม่มี session จะส่งไปหน้า HOme
  // if (!session) {
  //   router.push("/");
  //   return;
  // }

  //-- ใช้เก็บ postId
  const [currentPost, setCurrentPost] = useState(null);

  //-- ใช้ func delete
  const [isRemove, setIsRemove] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  // func remove
  const handleIsRemove = (postId) => {
    setIsRemove(!isRemove);
    setRemoveOpen(!removeOpen);
    setCurrentPost(postId);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setIsRemove(!isRemove);
      setRemoveOpen(!removeOpen);
      const data = await response.json();
      console.log("Post deleted:", data);
      getPost(selectCommunity?.name, searchTerm);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // func Edit
  const handleEdit = (postId, postTitle, postText, postCommunity) => {
    setIsEdit(!isEdit);
    setEditOpen(!editOpen);
    setCurrentPost(postId);
    setEditTitle(postTitle);
    setEditText(postText);
    setEditCommunity(postCommunity);
  };

  const handleSave = async (postId) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          community: editCommunity,
          title: editTitle,
          text: editText,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsEdit(false);
      setEditOpen(false);
      setCurrentPost(null);

      setFetchPost((e) =>
        e.map((post) =>
          post._id === postId
            ? {
                ...post,
                community: editCommunity,
                title: editTitle,
                text: editText,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCommunityChange = (community) => {
    console.log("Selected community:", community);
    setSelectCommunity(community);
    setDropDown(false);
    setDropOpen(false);
  };

  // func Create
  const handleCreate = () => {
    setIsCreate(!isCreate);
    setCreateOpen(!createOpen);
  };

  const handleAddPost = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user._id,
          username: session.user.username,
          urlImg: session.user.urlImg,
          community: addCommunity.name,
          title: title,
          text: text,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add post: " + res.statusText);
      }
      await getPost();
      setAddCommunity(null);
      setTitle("");
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
    setDropOpen(!dropOpen);
  };

  const handleopenChooseCommu = () => {
    setOpenChoose(!openChoose);
  };

  const dropList = [
    {
      id: "d01",
      name: "History",
    },
    {
      id: "d02",
      name: "Food",
    },
    {
      id: "d03",
      name: "Pets",
    },
    {
      id: "d04",
      name: "Health",
    },
    {
      id: "d05",
      name: "Fashion",
    },
    {
      id: "d06",
      name: "Exercise",
    },
    {
      id: "d07",
      name: "Other",
    },
  ];

  // fetch APi
  const getPost = async (communityName, searchTerm) => {
    try {
      const response = await fetch(`${apiUrl}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      if (session && session.user && session.user._id) {
        let filterPost = data.filter((e) => e.userId === session.user._id);
        console.log(filterPost);

        if (communityName) {
          filterPost = filterPost.filter(
            (post) => post.community === communityName
          );
        }

        if (searchTerm) {
          filterPost = filterPost.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setFetchPost(filterPost);
      } else {
        console.error("Session or session.user is undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      getPost(selectCommunity?.name, searchTerm);
    }
  }, [session, searchTerm, selectCommunity]);

  return (
    <div>
      {isPC ? (
        <div
          id="pc"
          className=" w-screen h-screen overflow-y-auto flex justify-center bg-[#bbc2c0]"
        >
          <SidebarLeft />
          <div className=" max-w-[900px] h-screen bg-[#bbc2c0] flex flex-col relative">
            <div className="h-[140px] w-[900px]  flex items-center justify-between">
              <div className=" h-[110px] w-[560px]  flex items-center">
                <div className="w-full h-[50px] bg-[#bbc2c0] rounded-lg border-solid border-4 border-[#d4e4df] flex items-center px-3">
                  <img
                    src="/search-svgrepo-com.svg"
                    alt=""
                    className=" w-[25px] h-[25px]"
                  />
                  <input
                    type="text"
                    placeholder="searh"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" h-full w-full bg-transparent ml-2 text-xl placeholder:text-[#5b5b5b] focus:outline-none focus:text-black"
                  />
                </div>
              </div>

              <div className=" h-[110px] w-[290px] flex justify-between items-center ">
                <div className="relative ">
                  {/* ปุ่ม dropdown */}
                  <button onClick={handleDropDown}>
                    <div className="flex w-[160px] text-xl h-[50px] items-center justify-center hover:bg-slate-400 rounded-xl">
                      {selectCommunity ? selectCommunity.name : "Community"}
                      <span className="ml-2">
                        <img
                          src="/down-arrow-5-svgrepo-com.svg"
                          alt="drop"
                          className="w-[25px] h-[25px]"
                        />
                      </span>
                    </div>
                  </button>

                  {dropDown && (
                    <div className="absolute mt-2 w-[240px] right-0 overflow-hidden bg-white rounded-md shadow-lg z-20">
                      <ul className=" overflow-hidden ">
                        {dropList.map((e) => (
                          <div
                            key={e.id}
                            onClick={() => handleCommunityChange(e)}
                            className=" w-full h-[45px] font-semibold text-lg flex items-center hover:bg-[#d8e9e4]"
                          >
                            <h1 className="px-4 ">{e.name}</h1>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}

                  {dropOpen && (
                    <div
                      className="fixed inset-0 bg-black opacity-50 z-10"
                      onClick={handleDropDown}
                    />
                  )}
                </div>

                <div className=" relative">
                  <button onClick={handleCreate}>
                    <div className=" flex w-[120px] text-xl h-[50px] items-center justify-center text-[#ffffff] bg-[#49a569] rounded-xl">
                      Create{" "}
                      <span className=" ml-2">
                        <img
                          src="/plus-svgrepo-com.svg"
                          alt="plus"
                          className=" w-[25px] h-[25px]"
                        />
                      </span>
                    </div>
                  </button>

                  {isCreate && (
                    <div className="w-[1000px] h-[480px] p-4 bg-[#FFFFFF] flex flex-col justify-between rounded-xl absolute -right-12 top-24 z-40">
                      <div
                        id="head"
                        className=" flex justify-between h-[80px]  items-end relative"
                      >
                        <h1 className=" text-[#191919] text-6xl font-medium">
                          Create Post
                        </h1>
                        <div className=" flex h-[100px] items-start relative top-2">
                          <button onClick={handleCreate}>
                            <img
                              src="/post/close-md-svgrepo-com.svg"
                              alt=""
                              className=" w-[35px] h-[35px]"
                            />
                          </button>
                        </div>
                      </div>
                      <div id="drop" className=" relative">
                        <button
                          onClick={handleopenChooseCommu}
                          className=" px-3 py-2 flex bg-white border-2 border-[#49569] text-[#49a569] text-xl font-bold rounded-lg"
                        >
                          {addCommunity
                            ? addCommunity.name
                            : "Choose a community"}
                          <span className=" ml-2">
                            <img
                              src="/post/down-arrow-5-svgrepo-com (1).svg"
                              alt=""
                              className=" w-[25px] h-[25px]"
                            />
                          </span>
                        </button>
                        {openChoose && (
                          <div className="absolute mt-2 w-[240px] left-0 overflow-hidden bg-white rounded-md shadow-lg z-20">
                            <ul className=" overflow-hidden ">
                              {dropList.map((e) => (
                                <div
                                  key={e.id}
                                  onClick={() => {
                                    setAddCommunity(e), setOpenChoose(false);
                                  }}
                                  className=" w-full h-[40px] font-semibold text-lg flex items-center hover:bg-[#d8e9e4]"
                                >
                                  <h1 className="px-4 ">{e.name}</h1>
                                </div>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div
                        id="inp"
                        className=" flex flex-col h-[220px] w-[968px]  justify-between"
                      >
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className=" h-[40px] p-2 border-2 border-[#cdcdcd] rounded-lg outline-none"
                        />
                        <textarea
                          type="text"
                          placeholder="What's on your mind..."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className=" h-[170px] p-2 resize-none border-2 border-[#cdcdcd] rounded-lg outline-none"
                        />
                      </div>

                      <div
                        id="btn"
                        className=" w-[968px] h-[50px] flex items-end justify-end"
                      >
                        <div className=" w-[330px] h-[50px] flex justify-between absolute right-4 ">
                          <button
                            onClick={handleCreate}
                            className=" px-12 py-3 bg-white border-2 border-[#49569] text-[#49a569] text-xl font-bold rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              handleAddPost();
                              handleCreate(false);
                            }}
                            className="  px-12 py-3 bg-[#49a569] text-white text-xl font-bold rounded-lg"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {createOpen && (
                    <div
                      className="fixed inset-0 bg-black opacity-50 z-10"
                      onClick={handleCreate}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className=" flex-grow rounded-2xl bg-[#ffffff] flex flex-col relative">
              <div className="flex mb-28 flex-col rounded-3xl items-start justify-start w-full ">
                {fetchPost.map((e) => (
                  <div key={e._id} className="w-full h-[230px] flex flex-col">
                    <div className=" w-full  flex flex-col p-4 bg  border-[#bbc2c0] border-b-2 ">
                      <div className="  h-[50px]  flex justify-between">
                        <Link href={"/detail/" + e._id}>
                          <div className=" flex w-[170px] h-[50px] justify-between">
                            <img
                              src={e.urlImg}
                              alt=""
                              className=" w-[50px] h-[50px] rounded-3xl"
                            />
                            <div className=" w-[110px] h-[50px] flex justify-start items-center text-lg font-normal text-[#939494]">
                              <h1>{e.username}</h1>
                            </div>
                          </div>
                        </Link>
                        <div className=" w-[90px] h-[50px] flex items-center justify-between">
                          <div id="Editing">
                            <button
                              onClick={() =>
                                handleEdit(e._id, e.title, e.text, e.community)
                              }
                            >
                              <img
                                src="/edit-2-svgrepo-com.svg"
                                alt=""
                                className=" w-[30px] h-[30px]"
                              />
                            </button>

                            {isEdit && currentPost === e._id && (
                              <div className="w-[1000px] h-[480px] p-4 bg-[#FFFFFF] flex flex-col justify-between rounded-xl absolute -right-12 top-0 z-40">
                                <div
                                  id="head"
                                  className=" flex justify-between h-[80px]  items-end relative"
                                >
                                  <h1 className=" text-[#191919] text-6xl font-medium">
                                    Edit Post
                                  </h1>
                                  <div className=" flex h-[100px] items-start relative top-2">
                                    <button onClick={handleEdit}>
                                      <img
                                        src="/post/close-md-svgrepo-com.svg"
                                        alt=""
                                        className=" w-[35px] h-[35px]"
                                      />
                                    </button>
                                  </div>
                                </div>
                                <div id="drop" className=" relative">
                                  <button
                                    onClick={handleopenChooseCommu}
                                    className=" px-3 py-2 flex bg-white border-2 border-[#49569] text-[#49a569] text-xl font-bold rounded-lg"
                                  >
                                    {editCommunity
                                      ? editCommunity
                                      : "Community"}
                                    <span className=" ml-2">
                                      <img
                                        src="/post/down-arrow-5-svgrepo-com (1).svg"
                                        alt=""
                                        className=" w-[25px] h-[25px]"
                                      />
                                    </span>
                                  </button>
                                  {openChoose && (
                                    <div className="absolute mt-2 w-[240px] left-0 overflow-hidden bg-white rounded-md shadow-lg z-20">
                                      <ul className=" overflow-hidden ">
                                        {dropList.map((e) => (
                                          <div
                                            key={e.id}
                                            onClick={() => {
                                              setEditCommunity(e.name),
                                                setOpenChoose(false);
                                            }}
                                            className=" w-full h-[40px] font-semibold text-lg flex items-center hover:bg-[#d8e9e4]"
                                          >
                                            <h1 className="px-4 ">{e.name}</h1>
                                          </div>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <div
                                  id="inp"
                                  className=" flex flex-col h-[220px] w-[968px]  justify-between"
                                >
                                  <input
                                    type="text"
                                    placeholder="Title"
                                    value={editTitle}
                                    onChange={(e) =>
                                      setEditTitle(e.target.value)
                                    }
                                    className=" h-[40px] p-2 border-2 border-[#cdcdcd] rounded-lg outline-none"
                                  />
                                  <textarea
                                    type="text"
                                    placeholder="What's on your mind..."
                                    value={editText}
                                    onChange={(e) =>
                                      setEditText(e.target.value)
                                    }
                                    className=" h-[170px] p-2 resize-none border-2 border-[#cdcdcd] rounded-lg outline-none"
                                  />
                                </div>

                                <div
                                  id="btn"
                                  className=" w-[968px] h-[50px] flex items-end justify-end"
                                >
                                  <div className=" w-[330px] h-[50px] flex justify-between absolute right-4 ">
                                    <button
                                      onClick={handleEdit}
                                      className=" px-12 py-3 bg-white border-2 border-[#49569] text-[#49a569] text-xl font-bold rounded-lg"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSave(e._id)}
                                      className="  px-12 py-3 bg-[#49a569] text-white text-xl font-bold rounded-lg"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            {editOpen && (
                              <div
                                className="fixed inset-0 bg-black opacity-50 z-10"
                                onClick={handleCreate}
                              />
                            )}
                          </div>

                          <div id="remove">
                            <button onClick={() => handleIsRemove(e._id)}>
                              <img
                                src="/bin-svgrepo-com.svg"
                                alt=""
                                className=" w-[30px] h-[30px]"
                              />
                            </button>
                            {isRemove && currentPost === e._id && (
                              <div className=" absolute w-[500px] h-[260px] rounded-xl right-44 top-10 overflow-hidden bg-[#FFFFFF] z-20">
                                <div className=" mt-4 text-[#101828] text-xl font-medium w-[500px] py-5 h-[80px] flex flex-col items-center justify-start">
                                  <h1>Please confirm if you wish to</h1>

                                  <h1>delete th post</h1>
                                </div>
                                <div className=" text-[#475467] text-xl font-light w-[500px] py-5 h-[80px] bg-[#FFFFFF]  flex flex-col items-center justify-end">
                                  <h1>Are you sure want to delete the post?</h1>

                                  <h1>Once deleted, it cannot be recovered.</h1>
                                </div>
                                <div className=" pb-6 px-6 w-[500px] h-[100px] flex justify-between items-end">
                                  <button
                                    onClick={handleIsRemove}
                                    className=" rounded-lg w-[210px] h-[55px] text-2xl font-medium bg-[#FFFFFF] border-2 border-[#dadada] flex items-center justify-center"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleDeletePost(e._id)}
                                    className=" rounded-lg w-[210px] h-[55px] text-2xl font-medium bg-[#f23536] text-[#FFFFFF] flex items-center justify-center"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                            {removeOpen && (
                              <div
                                className="fixed inset-0 bg-black opacity-50 z-10"
                                onClick={handleIsRemove}
                              />
                            )}
                          </div>
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

                      <div className=" h-[30px]  text-[#939494]">
                        <div className=" w-[120px] font-semibold h-[30px] flex justify-between items-center ">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SidebarRight />
        </div>
      ) : (
        <div
          id="mobile"
          className=" w-screen h-screen flex flex-col bg-[#bbc2c0] pb-24  relative"
        >
          <div className=" w-full h-[120px] px-4 flex items-end">
            <div className=" relative w-full h-[60px]  flex justify-between items-end">
              {isSearching && (
                <div className=" z-30 absolute left-0 flex w-full bg-[#bbc2c0] h-[40px] border-solid border-4 rounded-lg border-[#d8e9e4] ">
                  <button onClick={handleSearchClick} className=" mx-2">
                    <img
                      src="/search-svgrepo-com.svg"
                      alt=""
                      className=" w-[25px] h-[25px]"
                    />
                  </button>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" mr-2 w-full h-full bg-transparent text-[#191919] focus:outline-none"
                  />
                </div>
              )}
              <button
                onClick={handleSearchClick}
                className=" w-[40px] h-[40px] flex items-center "
              >
                <img
                  src="/search-svgrepo-com (1).svg"
                  alt=""
                  className=" w-[25px] h-[25px]"
                />
              </button>

              <div className=" h-[40px] w-[245px] flex justify-between">
                <div className=" relative ">
                  <button
                    onClick={handleDropDown}
                    className=" flex w-[140px] text-lg h-[40px] items-center justify-center  rounded-xl"
                  >
                    {selectCommunity ? selectCommunity.name : "Community"}
                    <span className="ml-1">
                      <img
                        src="/down-arrow-5-svgrepo-com.svg"
                        alt="drop"
                        className="w-[25px] h-[25px]"
                      />
                    </span>
                  </button>
                  {dropDown && (
                    <div className="absolute mt-2 w-[220px] top-7 right-5 overflow-hidden bg-white rounded-md shadow-lg z-20">
                      <ul className=" overflow-hidden ">
                        {dropList.map((e) => (
                          <div
                            key={e.id}
                            onClick={() => handleCommunityChange(e)}
                            className=" w-full h-[45px] font-semibold text-lg flex items-center hover:bg-[#d8e9e4]"
                          >
                            <h1 className="px-4 ">{e.name}</h1>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {dropOpen && (
                  <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={handleDropDown}
                  />
                )}
                <div className=" ">
                  <button
                    onClick={handleCreate}
                    className="flex w-[105px] bg-[#49a569] text-lg h-[40px] items-center justify-center text-white rounded-xl"
                  >
                    Create
                    <span className=" ml-2">
                      <img
                        src="/plus-svgrepo-com.svg"
                        alt="plus"
                        className=" w-[25px] h-[25px]"
                      />
                    </span>
                  </button>
                  {isCreate && (
                    <div className="  w-full h-[650px] p-4 bg-[#FFFFFF] flex flex-col justify-between rounded-xl absolute right-0 top-[15px] z-40 ">
                      <div
                        id="head"
                        className=" flex justify-between min-h-[60px] items-end relative"
                      >
                        <h1 className=" text-[#191919] text-4xl font-medium">
                          Create Post
                        </h1>
                        <div className=" flex min-h-[0px] items-start">
                          <button onClick={handleCreate}>
                            <img
                              src="/post/close-md-svgrepo-com.svg"
                              alt=""
                              className=" w-[35px] h-[35px]"
                            />
                          </button>
                        </div>
                      </div>
                      <div id="drop" className="  min-h-[60px] flex items-end ">
                        <button
                          onClick={handleopenChooseCommu}
                          className=" w-full px-3 py-2 flex justify-center  bg-white border-2 border-[#49a569] text-[#49a569] text-xl font-medium rounded-lg"
                        >
                          {addCommunity
                            ? addCommunity.name
                            : "Choose a community"}
                          <span className=" ml-2">
                            <img
                              src="/post/down-arrow-5-svgrepo-com (1).svg"
                              alt=""
                              className=" w-[25px] h-[25px]"
                            />
                          </span>
                        </button>
                      </div>
                      <div
                        id="inp"
                        className=" flex flex-col justify-between h-[318px] "
                      >
                        {openChoose ? (
                          <div className=" w-full h-full overflow-hidden border-[#cdcdcd] border-2 bg-white rounded-md shadow-lg z-20">
                            <ul className=" overflow-hidden ">
                              {dropList.map((e) => (
                                <div
                                  key={e.id}
                                  onClick={() => {
                                    setAddCommunity(e), setOpenChoose(false);
                                  }}
                                  className=" w-full h-[45px] font-semibold text-lg flex items-center hover:bg-[#d8e9e4]"
                                >
                                  <h1 className="px-4 ">{e.name}</h1>
                                </div>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className=" w-full h-full flex flex-col justify-between">
                            <input
                              type="text"
                              placeholder="Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className=" w-full h-[40px] p-2 border-2 border-[#cdcdcd] rounded-lg outline-none"
                            />
                            <textarea
                              type="text"
                              placeholder="What's on your mind..."
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              className=" w-full h-[270px] p-2 resize-none border-2 border-[#cdcdcd] rounded-lg outline-none"
                            />
                          </div>
                        )}
                      </div>

                      <div
                        id="btn"
                        className="  w-full  h-[120px] flex items-end justify-end"
                      >
                        <div className=" h-[120px] flex w-full flex-col justify-between ">
                          <button
                            onClick={handleCreate}
                            className=" w-full py-3 bg-white border-2 border-[#49a569] text-[#49a569] text-xl font-bold rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              handleAddPost();
                              handleCreate(false);
                            }}
                            className=" w-full px-12 py-3 bg-[#49a569] text-white text-xl font-bold rounded-lg"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {createOpen && (
                    <div
                      className="fixed inset-0 bg-black opacity-50 z-10"
                      onClick={handleCreate}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" w-screen h-screen my-6 px-4 overflow-y-auto">
            <div className=" w-full h-full bg-[#ffffff] rounded-xl overflow-hidden overflow-y-auto">
              {fetchPost.map((e) => (
                <div
                  key={e.id}
                  className=" w-full h-[240px] bg-[#FFFFFF] py-4 border-b-4 border-[#bbc2c0]"
                >
                  <div className=" w-full px-4">
                    <div className=" w-full h-[50px] flex justify-between ">
                      <div className=" flex h-full items-center justify-between w-[190px]">
                        <Link
                          href={"/detail/" + e._id}
                          className=" flex items-center "
                        >
                          <img
                            src={e.urlImg}
                            alt=""
                            className=" w-[50px] h-[50px] rounded-full mr-2"
                          />
                          <div className=" w-[120px] h-full flex items-center text-[#939494] text-xl font-semibold">
                            <h1>{e.username}</h1>
                          </div>
                        </Link>
                      </div>

                      <div className=" w-[80px] h-[50px] flex items-center justify-between">
                        <div>
                          <button
                            onClick={() =>
                              handleEdit(e._id, e.title, e.text, e.community)
                            }
                            className=" w-[50px] flex justify-center"
                          >
                            <img
                              src="/edit-2-svgrepo-com.svg"
                              alt=""
                              className=" w-[30px] h-[30px]"
                            />
                          </button>
                          {isEdit && currentPost === e._id && (
                            <div className="  w-[92vw] h-[720px] p-4 bg-[#FFFFFF] flex flex-col justify-between rounded-xl absolute right-4 top-24 z-40">
                              <div
                                id="head"
                                className=" flex justify-between h-[80px]  items-end relative"
                              >
                                <h1 className=" text-[#191919] text-6xl font-medium">
                                  Edit Post
                                </h1>
                                <div className=" flex h-[100px] items-start relative top-2">
                                  <button onClick={handleEdit}>
                                    <img
                                      src="/post/close-md-svgrepo-com.svg"
                                      alt=""
                                      className=" w-[35px] h-[35px]"
                                    />
                                  </button>
                                </div>
                              </div>
                              <div id="drop" className=" relative">
                                <button
                                  onClick={handleopenChooseCommu}
                                  className=" px-3 py-2 flex bg-white border-2 border-[#49569] text-[#49a569] text-xl font-bold rounded-lg"
                                >
                                  {editCommunity ? editCommunity : "Community"}
                                  <span className=" ml-2">
                                    <img
                                      src="/post/down-arrow-5-svgrepo-com (1).svg"
                                      alt=""
                                      className=" w-[25px] h-[25px]"
                                    />
                                  </span>
                                </button>
                                {openChoose && (
                                  <div className="absolute mt-2 w-[240px] left-0 overflow-hidden bg-white rounded-md shadow-lg z-20">
                                    <ul className=" overflow-hidden ">
                                      {dropList.map((e) => (
                                        <div
                                          key={e.id}
                                          onClick={() => {
                                            setEditCommunity(e.name),
                                              setOpenChoose(false);
                                          }}
                                          className=" w-full h-[40px] font-semibold text-lg flex items-center hover:bg-[#d8e9e4]"
                                        >
                                          <h1 className="px-4 ">{e.name}</h1>
                                        </div>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                              <div
                                id="inp"
                                className=" flex flex-col h-[500px] w-[85vw] justify-around "
                              >
                                <input
                                  type="text"
                                  placeholder="Title"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className=" w-[85vw] h-[40px] p-2 border-2 border-[#cdcdcd] rounded-lg outline-none"
                                />
                                <textarea
                                  type="text"
                                  placeholder="What's on your mind..."
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className=" w-[85vw] h-[400px] p-2 resize-none border-2 border-[#cdcdcd] rounded-lg outline-none"
                                />
                              </div>

                              <div
                                id="btn"
                                className=" w-[968px] h-[50px] flex items-end justify-end"
                              >
                                <div className=" w-[330px] h-[50px] flex justify-between absolute right-4 ">
                                  <button
                                    onClick={handleEdit}
                                    className=" px-12 py-3 bg-white border-2 border-[#49569] text-[#49a569] text-xl font-bold rounded-lg"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSave(e._id)}
                                    className="  px-12 py-3 bg-[#49a569] text-white text-xl font-bold rounded-lg"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {editOpen && (
                            <div
                              className="fixed inset-0 bg-black opacity-50 z-10"
                              onClick={handleCreate}
                            />
                          )}
                        </div>
                        <button
                          onClick={() => handleIsRemove(e._id)}
                          className=" w-[50px] flex justify-center"
                        >
                          <img
                            src="/bin-svgrepo-com.svg"
                            alt=""
                            className=" w-[30px] h-[30px]"
                          />
                        </button>
                        {isRemove && currentPost === e._id && (
                          <div className=" absolute w-[400px] h-[260px] rounded-xl right-4 top-28  overflow-hidden bg-[#FFFFFF] z-20">
                            <div className=" mt-4 text-[#101828] text-xl font-medium w-[400px]  py-5 h-[80px] flex flex-col items-center justify-start">
                              <h1>Please confirm if you wish to</h1>

                              <h1>delete th post</h1>
                            </div>
                            <div className=" text-[#475467] text-xl font-light w-[400px] py-5 h-[80px] bg-[#FFFFFF]  flex flex-col items-center justify-end">
                              <h1>Are you sure want to delete the post?</h1>

                              <h1>Once deleted, it cannot be recovered.</h1>
                            </div>
                            <div className=" pb-6 px-6 w-[400px] h-[100px] flex justify-between items-end">
                              <button
                                onClick={handleIsRemove}
                                className=" rounded-lg w-[150px] h-[55px] text-2xl font-medium bg-[#FFFFFF] border-2 border-[#dadada] flex items-center justify-center"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeletePost(e._id)}
                                className=" rounded-lg w-[150px] h-[55px] text-2xl font-medium bg-[#f23536] text-[#FFFFFF] flex items-center justify-center"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                        {removeOpen && (
                          <div
                            className="fixed inset-0 bg-black opacity-50 z-10"
                            onClick={handleIsRemove}
                          />
                        )}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
