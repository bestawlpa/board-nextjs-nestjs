"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();

  console.log("session", session);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className=" text-[white]">
      {isPC ? (
        <div className="w-screen h-[100px] bg-[#243831] flex items-center justify-between ">
          <div className="h-full w-[50vw] flex items-center justify-start pl-10 ">
            <Link href={"/"} className="  text-4xl font-extrabold">
              <h1 className="playfair-display">a Board</h1>
            </Link>
          </div>
          <div className="h-full w-[50vw] flex items-center justify-end pr-10">
            {session?.user ? (
              <div className=" w-[170px] h-[60px] px-2  rounded-xl flex items-center justify-between text-xl font-light">
                <div className=" w-[100px] h-[60px] flex items-center justify-end mr-2">
                  <h1>{session.user.username}</h1>
                </div>
                <img
                  src={session.user.urlImg}
                  alt=""
                  className=" w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
            ) : (
              <Link href={"/login"}>
                <div className=" w-[140px] h-[50px]  bg-[#49a569] rounded-xl flex items-center justify-center text-2xl font-extrabold ">
                  Sign In
                </div>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-screen h-[100px] bg-[#243831] ">
          <div className=" w-[50vw] flex items-center justify-start pl-6 ">
            <Link
              href={"/"}
              className="playfair-display text-4xl font-extrabold"
            >
              a Board
            </Link>
          </div>

          <div className=" w-[50vw] flex items-center justify-end pr-6">
            <button onClick={toggleDrawer} className="text-white">
              {isDrawerOpen ? (
                <div>
                  <img
                    src="/right-arrow-svgrepo-com (2).svg"
                    alt=""
                    className=" w-6"
                  />
                  <div
                    className={`fixed right-0 top-0 h-full w-[250px] bg-[#243831] shadow-lg z-20 transform transition-transform duration-300 ${
                      isDrawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <div className="p-4 flex justify-between items-center">
                      <button onClick={toggleDrawer} className="text-white">
                        <img
                          src="/right-arrow-svgrepo-com (2).svg"
                          alt="Toggle Drawer"
                          className=" w-6 h-6"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col mt-8">
                      <Link
                        href={"/"}
                        onClick={toggleDrawer}
                        className=" flex p-4 hover:bg-gray-300 text-white"
                      >
                        <span>
                          <img
                            src="/home-line-svgrepo-com.svg"
                            alt=""
                            className=" w-6 h-6 mr-2"
                          />
                        </span>
                        <span className=" relative top-1">Home</span>
                      </Link>
                      <Link
                        href={"/ourblog"}
                        onClick={toggleDrawer}
                        className=" flex p-4 hover:bg-gray-300 text-white "
                      >
                        <span>
                          <img
                            src="/blog-comment-edit-svgrepo-com.svg"
                            alt=""
                            className=" w-6 h-6 mr-2"
                          />
                        </span>
                        <span className=" relative top-[2px]">Our Blog</span>
                      </Link>

                      {session?.user ? (
                        <Link
                          href={"/"}
                          onClick={() => signOut()}
                          className=" flex p-4 hover:bg-gray-300 text-white"
                        >
                          <span>
                            <img
                              src="/logout-2-svgrepo-com.svg"
                              alt=""
                              className=" w-6 h-6 mr-2"
                            />
                          </span>
                          <span className=" relative top-1">Log Out</span>
                        </Link>
                      ) : (
                        <Link
                          href={"/login"}
                          onClick={toggleDrawer}
                          className=" flex p-4 hover:bg-gray-300 text-white"
                        >
                          <span>
                            <img
                              src="/sign-in-svgrepo-com.svg"
                              alt=""
                              className=" w-6 h-6 mr-2"
                            />
                          </span>
                          <span className=" relative top-[2px]">Sign In</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {isDrawerOpen && (
                    <div
                      className="fixed inset-0 bg-black opacity-50 z-10"
                      onClick={toggleDrawer}
                    />
                  )}
                </div>
              ) : (
                <div>
                  <img src="/menu-svgrepo-com.svg" alt="" className=" w-6" />
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
