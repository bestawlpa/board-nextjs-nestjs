import React from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const OurBlogContent = (props) => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const {
    fetchPost,
    handleEdit,
    isEdit,
    currentPost,
    handleopenChooseCommu,
    editCommunity,
    openChoose,
    dropList,
    setEditCommunity,
    setOpenChoose,
    editTitle,
    setEditTitle,
    editText,
    setEditText,
    handleSave,
    editOpen,
    handleCreate,
    handleIsRemove,
    isRemove,
    handleDeletePost,
    removeOpen,
  } = props;
  return (
    <div>
      {isPC ? (
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
                            className=" flex flex-col h-[220px] w-[968px]  justify-between"
                          >
                            <input
                              type="text"
                              placeholder="Title"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className=" h-[40px] p-2 border-2 border-[#cdcdcd] rounded-lg outline-none"
                            />
                            <textarea
                              type="text"
                              placeholder="What's on your mind..."
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
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
      ) : (
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
      )}
    </div>
  );
};

export default OurBlogContent;
