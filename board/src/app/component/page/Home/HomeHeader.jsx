import React from "react";
import { useMediaQuery } from "react-responsive";

const HomeHeader = (props) => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const {
    searchTerm,
    setSearchTerm,
    handleDropDown,
    selectCommunity,
    handleCreate,
    isCreate,
    handleopenChooseCommu,
    addCommunity,
    openChoose,
    dropDown,
    dropList,
    handleCommunityChange,
    dropOpen,
    setAddCommunity,
    setOpenChoose,
    title,
    setTitle,
    text,
    setText,
    handleAddPost,
    createOpen,
    isSearching,
    handleSearchClick,
  } = props;

  return (
    <div>
      {isPC ? (
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
                  Create
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
                      {addCommunity ? addCommunity.name : "Choose a community"}
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
      ) : (
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
      )}
    </div>
  );
};

export default HomeHeader;
