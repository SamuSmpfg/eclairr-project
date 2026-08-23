import ChannelData from "./(site)/components/ChannelData";
import Header from "./(site)/components/Header";
import RecentVideos from "./(site)/components/RecentVideos";
import Workflow from "./(site)/components/Workflow";
import Sidebar from "./(site)/components/sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <div className="w-full px-[32px]">
        <Header />
        <div className="flex flex-row flex-grow mb-[24px]">
          <Sidebar />
          <ChannelData />
          <div className="flex flex-col flex-grow gap-x-[200px]">
            <Workflow />
            <div className=' w-full ml-[85px] items-center'>
              <RecentVideos />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}