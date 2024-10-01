"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const SidebarLeft = () => {
  const { data: session } = useSession();
  return (
    <div className=" h-full w-[300px] bg-[#bbc2c0] p-4 text-[#243831] text-lg  flex justify-center">
      <div className="  mt-10">
        <Link href={"/"}>
          <div className=" flex justify-start items-center w-[130px] h-[40px]  mb-2">
            <span className=" mr-2">
              <img
                src="/home-line-svgrepo-com (2).svg"
                alt=""
                className=" w-6 h-6"
              />
            </span>
            <span className=" relative top-1">Home</span>
          </div>
        </Link>
        <Link href={"/ourblog"}>
          <div className=" flex justify-start items-center w-[130px] h-[40px] ">
            <span className=" mr-2">
              <img
                src="/blog-comment-edit-svgrepo-com (2).svg"
                alt=""
                className=" w-6 h-6"
              />
            </span>
            Our Blog
          </div>
        </Link>

        {session ? (
          <button
            onClick={() => signOut()} // ฟังก์ชัน signOut จะถูกเรียกเมื่อคลิกปุ่ม
            className=" flex justify-center items-center w-[130px] h-[40px] bg-red-700 mt-6 text-white rounded"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SidebarLeft;
