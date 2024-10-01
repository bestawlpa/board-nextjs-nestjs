"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const [username, setUsername] = useState("Something");
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session, "data");

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [session]);

  const handleLogin = async () => {
    try {
      const res = await signIn("credentials", {
        username,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isPC ? (
        <div className=" w-screen h-screen bg-[#243831] flex text-white">
          <div
            id="left"
            className=" w-[60vw] h-full flex items-center justify-center"
          >
            <div className=" flex flex-col justify-between h-[240px] w-[300px] ">
              <div className=" h-[80px] text-3xl font-semibold flex items-center">
                <h1>Sign IN</h1>
              </div>
              <div className=" flex flex-col justify-between h-[150px]">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-[40px] rounded-md  focus:outline-none text-[#191919] px-2"
                />

                <button
                  onClick={handleLogin}
                  className="h-[40px] rounded-md bg-[#49a569] text-xl font-semibold flex justify-center items-center"
                >
                  Sign IN
                </button>

                <div className=" flex justify-center">
                  create user ?
                  <Link href={"/register"}>
                    <div className=" ml-2 outline-1 text-red-600">Click</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            id=" right"
            className=" w-[40vw] h-full bg-[#2b5f44] rounded-l-3xl flex items-center justify-center"
          >
            <div className=" h-[310px] w-full flex flex-col items-center justify-between">
              <img
                src="/a-woman-holding-a-paper-board-svgrepo-com.svg"
                alt="img"
                className=" h-[250px]"
              />
              <h1 className="playfair-display text-3xl font-medium ">
                a Board
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-screen h-screen bg-[#243831] flex flex-col text-white">
          <div className=" h-[45vh] w-full bg-[#2b5f44] rounded-b-3xl flex flex-col items-center justify-center">
            <div className=" w-[200px] h-[220px] flex flex-col items-center justify-center">
              <img
                src="/a-woman-holding-a-paper-board-svgrepo-com.svg"
                alt=""
                className="h-[180px] w-[180px]"
              />
              <h1 className="playfair-display text-white text-2xl font-medium mt-4">
                a Board
              </h1>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col items-center justify-center w-full h-[55vh] ">
            <div className=" w-[90vw] h-[260px] flex flex-col justify-between">
              <div className=" h-[100px] flex items-end text-2xl">
                <h1>Sign IN</h1>
              </div>
              <div className=" flex flex-col  h-[125px] justify-between ">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none text-[#191919] px-2"
                />

                <button
                  onClick={handleLogin}
                  className="h-[40px] rounded-md bg-[#49a569] text-xl font-semibold flex justify-center items-center"
                >
                  Sign In
                </button>

                <div className=" flex justify-center">
                  create user ?
                  <Link href={"/register"}>
                    <div className=" ml-2 outline-1 text-red-600">Click</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// const [hydrated, setHydrated] = useState(false);

// useEffect(() => {
//   console.log("Effect ran");
//   setHydrated(true);
// }, []);

// if (!hydrated) {
//   return null;
// }
