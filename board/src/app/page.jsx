"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import SidebarLeft from "./component/SidebarLeft";
import SidebarRight from "./component/SidebarRight";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import HomeHeader from "./component/page/Home/HomeHeader";
import HomeContent from "./component/page/Home/HomeContent";

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
              <HomeContent fetchPost={fetchPost} />
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
            <HomeContent fetchPost={fetchPost} />
          </div>
        </div>
      )}
    </div>
  );
}
