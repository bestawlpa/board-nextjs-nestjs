"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import SidebarLeft from "./component/SidebarLeft";
import SidebarRight from "./component/SidebarRight";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HomeHeader from "./component/page/Home/HomeHeader";

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);
  const [selectCommunity, setSelectCommunity] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [addCommunity, setAddCommunity] = useState(null);
  const [fetchPost, setFecthPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const isPC = useMediaQuery({ minWidth: 1024 });
  const { data: session } = useSession();
  const router = useRouter();

  const getPost = async (communityName, searchTerm) => {
    try {
      const response = await fetch(`${apiUrl}/posts`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      let filteredPosts = communityName
        ? data.filter((post) => post.community === communityName)
        : data;

      if (searchTerm) {
        filteredPosts = filteredPosts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFecthPost(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };

  const handleCreate = () => {
    setIsCreate(!isCreate);
    setCreateOpen(!createOpen);
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

  const handleCommunityChange = (community) => {
    console.log("Selected community:", community);
    setSelectCommunity(community);
    setDropDown(false);
    getPost(community.name);
    setDropOpen(false);
  };

  useEffect(() => {
    getPost(selectCommunity?.name, searchTerm);
  }, [selectCommunity, searchTerm]);

  return (
    <div>
      {isPC ? (
        <div className=" w-screen h-screen overflow-y-auto flex justify-center bg-[#bbc2c0] ">
          <SidebarLeft />

          <div className=" max-w-[900px] h-screen bg-[#bbc2c0] flex flex-col">
            <HomeHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleDropDown={handleDropDown}
              selectCommunity={selectCommunity}
              handleCreate={handleCreate}
              isCreate={isCreate}
              handleopenChooseCommu={handleopenChooseCommu}
              addCommunity={addCommunity}
              openChoose={openChoose}
              dropDown={dropDown}
              dropList={dropList}
              handleCommunityChange={handleCommunityChange}
              dropOpen={dropOpen}
              setAddCommunity={setAddCommunity}
              setOpenChoose={setOpenChoose}
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              handleAddPost={handleAddPost}
              createOpen={createOpen}
            />

            <div className=" flex-grow rounded-2xl bg-[#ffffff] flex flex-col">
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
                            <h1 className=" font-semibold text-xl">
                              {e.title}
                            </h1>
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
            </div>
          </div>
          <SidebarRight />
        </div>
      ) : (
        <div
          id="mobile"
          className=" w-screen h-screen flex flex-col bg-[#bbc2c0] pb-24  relative"
        >
          <HomeHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleDropDown={handleDropDown}
            selectCommunity={selectCommunity}
            handleCreate={handleCreate}
            isCreate={isCreate}
            handleopenChooseCommu={handleopenChooseCommu}
            addCommunity={addCommunity}
            openChoose={openChoose}
            dropDown={dropDown}
            dropList={dropList}
            handleCommunityChange={handleCommunityChange}
            dropOpen={dropOpen}
            setAddCommunity={setAddCommunity}
            setOpenChoose={setOpenChoose}
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            handleAddPost={handleAddPost}
            createOpen={createOpen}
            isSearching={isSearching}
            handleSearchClick={handleSearchClick}
          />

          <div className=" w-screen h-screen my-6 px-4 overflow-y-auto">
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
          </div>
        </div>
      )}
    </div>
  );
}
