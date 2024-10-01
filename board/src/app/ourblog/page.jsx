"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SidebarLeft from "../component/SidebarLeft.jsx";
import SidebarRight from "../component/SidebarRight.jsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import OurBlogHeader from "../component/page/OurBlog/OurBlogHeader.jsx";
import OurBlogContent from "../component/page/OurBlog/OurBlogContent.jsx";

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
  if (!session) {
    router.push("/");
    return;
  }

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
            <OurBlogHeader
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

            <div className=" flex-grow rounded-2xl bg-[#ffffff] flex flex-col relative">
              <OurBlogContent
                fetchPost={fetchPost}
                handleEdit={handleEdit}
                isEdit={isEdit}
                currentPost={currentPost}
                handleopenChooseCommu={handleopenChooseCommu}
                editCommunity={editCommunity}
                openChoose={openChoose}
                dropList={dropList}
                setEditCommunity={setEditCommunity}
                setOpenChoose={setOpenChoose}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editText={editText}
                setEditText={setEditText}
                handleSave={handleSave}
                editOpen={editOpen}
                handleCreate={handleCreate}
                handleIsRemove={handleIsRemove}
                isRemove={isRemove}
                handleDeletePost={handleDeletePost}
                removeOpen={removeOpen}
              />
            </div>
          </div>
          <SidebarRight />
        </div>
      ) : (
        <div
          id="mobile"
          className=" w-screen h-screen flex flex-col bg-[#bbc2c0] pb-24  relative"
        >
          <OurBlogHeader
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
            <OurBlogContent
              fetchPost={fetchPost}
              handleEdit={handleEdit}
              isEdit={isEdit}
              currentPost={currentPost}
              handleopenChooseCommu={handleopenChooseCommu}
              editCommunity={editCommunity}
              openChoose={openChoose}
              dropList={dropList}
              setEditCommunity={setEditCommunity}
              setOpenChoose={setOpenChoose}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editText={editText}
              setEditText={setEditText}
              handleSave={handleSave}
              editOpen={editOpen}
              handleCreate={handleCreate}
              handleIsRemove={handleIsRemove}
              isRemove={isRemove}
              handleDeletePost={handleDeletePost}
              removeOpen={removeOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
