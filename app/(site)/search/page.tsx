'use client'

import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";
import AiEntry from "./components/AiEntry";

export default function Home() {
  return (
    <>
      <div className="w-full px-[32px]">
        <Header />
        <div className="flex flex-row flex-grow mb-[24px]">
          <Sidebar />
          <AiEntry />
        </div>
      </div>
    </>
  )
}