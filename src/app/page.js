'use client'

import Link from "next/link";


export default function Home() {
  

  return (
    <div className="w-screen h-screen overflow-hidden relative before:block before:absolute bg-blue-400 before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
      {/* <img
        src='https://picsum.photos/seed/picsum/1900/850'
        className="absolute top-0 left-0 min-h-full ob"
      /> */}
      <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
        <div className="col-span-6">
          <span className="uppercase text-white text-xs font-bold mb-2 block">Welcome to LMS</span>
          <h1 className="text-white font-extrabold text-5xl mb-8">Learning Management System</h1>
          <p className="text-stone-100 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link
            href={'/login'}
          >
            <button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
