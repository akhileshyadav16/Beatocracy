"use client";
import { useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { FaMusic } from "react-icons/fa6";
import { ImHeadphones } from "react-icons/im";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const callApi = async () => {
      try {
        await fetch("/api/user", { 
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    callApi();
  }, []);

  return (
    <div className="w-screen text-center py-10 min-h-screen bg-gradient-to-t from-slate-800 via-slate-900 to-slate-950">
      <div className="h-full flex flex-col gap-10 mx-auto py-10 text-slate-400 w-11/12">
        <div className="w-full flex flex-col gap-2 mx-auto h-96 sm:w-11/12 py-10 md:w-4/5">
          <h1 className="bg-gradient-to-r from-green-500  via-red-400 to-orange-400 w-fit mx-auto h-fit py-2 bg-clip-text text-transparent text-6xl font-bold">
            Beatocracy
          </h1>
          <span className="w-fit mx-auto h-fit py-2 bg-clip-text text-sky-300 text-5xl font-bold">Music Powered by Listeners</span>
          <p className="text-xl font-medium  py-2 text-slate-400 w-fit mx-auto h-fit ">Create streams as a creator or vote on songs as a listener. The most popular songs play first.</p>
          <div className="flex gap-10 text-sky-300 mt-10 pt-5 justify-center">
            <button  className="w-fit h-12 px-5 py-2  rounded-sm border-2 border-slate-700 bg-slate-900 hover:bg-slate-800 duration-300 cursor-pointer">
            <Link href={"/dashboard"}>Become a creator</Link>
            </button>
            <button className="w-fit h-12 px-5 py-2 cursor-pointer rounded-sm border-2 border-slate-700 bg-slate-900 hover:bg-slate-800 duration-300">
              <Link href={"/dashboard"}>Explore more</Link>
            </button>
          </div>
        </div>
        <div className="mt-10 w-11/12 sm:w-4/5 md:w-2/3 mx-auto py-10">
          <div className="w-fit mx-auto h-fit py-2 bg-clip-text text-sky-300 text-5xl font-bold">
            Key Features
          </div>
          <p className="text-xl font-medium py-4  w-fit mx-auto h-fit text-slate-400 ">
            Our platform connects creators and listeners in a unique way, giving power to the audience.
          </p>
          <div className="h-52 flex flex-col mt-6 gap-10 md:flex-row px-4">
            <div className="flex flex-col gap-2 border-2 border-slate-700 rounded-md py-4 px-3">
              <FiUsers className="w-10 h-10 mx-auto"/>
              <div className="font-semibold text-xl w-fit mx-auto h-fit text-sky-300">
                Create an Account
              </div>
              <p >
                Sign up as a creator to make streams or as a listener to vote on songs.
              </p>
            </div>
            <div  className="flex flex-col border-2 gap-2 border-slate-700 rounded-md py-4 px-3">
            <FaMusic className="w-10 h-10 mx-auto"/>
              <div className="font-semibold text-xl w-fit mx-auto h-fit text-sky-300">Stream or Vote</div>
              <p>
              Creators add songs to their streams, and listeners vote on which songs they want to hear next.
              </p>
            </div>
            <div className="flex flex-col border-2 gap-2 border-slate-700 rounded-md py-4 px-3">
              <ImHeadphones className="w-10 h-10 mx-auto"/>
              <div className="font-semibold text-xl w-fit mx-auto h-fit text-sky-300">
                Dynamic Playback
              </div>
              <p>
              Songs with the most votes play first, creating a truly listener-driven experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
