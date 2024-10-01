"use client";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

export default function Register() {
  const isPC = useMediaQuery({ minWidth: 1024 });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("@hotmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please complete all fields!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setError("");
        setSuccess("User registration successfully!");

        setUsername("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const data = await response.json();
        console.log(data, "data");
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error("network err", error);
      setError("network err");
    }
  };

  return (
    <div>
      {isPC ? (
        <div className=" w-screen h-screen bg-[#243831] flex text-white relative">
          <div
            id=" left"
            className=" w-[60vw] h-full flex items-center justify-center"
          >
            {error && (
              <div className=" w-full h-full absolute bottom-[200px] flex items-center justify-center">
                <div className=" w-[320px] h-[60px] flex items-center justify-center text-xl font-semibold text-red-500 bg-white z-20 rounded-lg">
                  {error}
                </div>
              </div>
            )}
            {success && (
              <div className=" w-full h-full absolute bottom-[200px] flex items-center justify-center">
                <div className=" w-[320px] h-[60px] flex items-center justify-center text-xl font-semibold text-green-600 bg-white z-20 rounded-lg">
                  {success}
                </div>
              </div>
            )}
            <div className=" flex flex-col h-[300px] w-[300px]">
              <div className=" h-[80px] text-3xl font-semibold flex items-center">
                <h1>Register</h1>
              </div>
              <div className=" flex flex-col justify-between h-[220px]">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none text-[#191919] px-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none  text-[#191919] px-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none text-[#191919] px-2"
                />
                <button
                  onClick={handleSubmit}
                  className="h-[40px] rounded-md bg-[#49a569] text-xl font-semibold flex justify-center items-center"
                >
                  submit
                </button>
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
        <div className=" w-screen h-screen bg-[#243831] flex flex-col text-white relative">
          {error && (
            <div className=" w-full h-full absolute bottom-[30px] flex items-center justify-center">
              <div className=" w-[320px] h-[60px] flex items-center justify-center text-xl font-semibold text-red-500 bg-white z-20 rounded-lg">
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className=" w-full h-full absolute bottom-[30px] flex items-center justify-center">
              <div className=" w-[320px] h-[60px] flex items-center justify-center text-xl font-semibold text-green-600 bg-white z-20 rounded-lg">
                {success}
              </div>
            </div>
          )}
          <div className=" h-[45vh] w-full bg-[#2b5f44] rounded-b-3xl flex flex-col items-center justify-center">
            <img
              src="/a-woman-holding-a-paper-board-svgrepo-com.svg"
              alt=""
              className="h-[180px] w-[180px]"
            />
            <h1 className="playfair-display text-white text-2xl font-medium mt-4">
              a Board
            </h1>
          </div>
          {/*  */}
          <div className="flex flex-col items-center justify-center w-full h-[55vh] ">
            <div className=" w-[90vw] h-[45vh] max-h-[340px] flex flex-col justify-between">
              <div className=" h-[100px] flex items-center text-2xl font-semibold">
                <h1>Register</h1>
              </div>
              <div className=" flex flex-col  h-[220px] justify-between ">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none text-[#191919] px-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none text-[#191919] px-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[40px] rounded-md focus:outline-none text-[#191919] px-2"
                />
                <button
                  onClick={handleSubmit}
                  className="h-[40px] rounded-md bg-[#49a569] text-xl font-semibold flex justify-center items-center"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
