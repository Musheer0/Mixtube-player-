import React, { useEffect, useRef, useState } from 'react'; // Importing necessary modules
import { useQuery } from '@tanstack/react-query'; // Importing useQuery hook
import { IoMdDownload } from "react-icons/io"; // Importing download icon
import { GrFormClose } from "react-icons/gr"; // Importing close icon
import Loader from '../Components/Loader'; // Importing Loader component

const Video = ({ search }) => { // Video component with a 'search' prop
  // State variables
  const [showdownload, setShowDownload] = useState(false); // State for controlling download visibility
  const [video, setVideo] = useState({ title: "loading...", formats: [], description: "", views: 0 }); // State for video data
  const [vid, setVid] = useState(); // State for video URL

  // Ref for video dimensions
  const videodimensions = useRef(null);

  // URL for fetching video data
  const url = 'https://yt-api.p.rapidapi.com/dl?id=' + search;

  // Regex pattern to extract URLs from description
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Headers for the fetch request
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'Your X-RapidAPI-Key',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  };

  // Fetch video data using useQuery hook
  const { data: video_data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['video'],
    queryFn: async () => {
      try {
        const response = await fetch(url, options);
        const video_data = await response.json();

        return {
          formats: [video_data.formats[0].url, video_data.formats[1].url],
          title: video_data.title,
          description: video_data.description,
          views: video_data.viewCount,
        }
      } catch (error) {
        window.location.href = '/error'; // Redirect to error page if fetch fails
      }
    }
  });

  // Effect to refetch data when 'search' changes
  useEffect(() => {
    refetch();
  }, [search]);

  // Effect to update video state when video_data changes
  useEffect(() => {
    if (video_data) {
      setVideo(video_data);
      setVid(video_data.formats[1].url);
    }
  }, [video_data]);

  // JSX for Video component
  return (
    <>
      {isLoading && <Loader />} {/* Display Loader component if data is loading */}
      <section className='w-full  py-5 lg:flex-row flex-col flex  bg-zinc-950 min-h-screen text-white'>
        {/* Display download overlay if showdownload is true */}
        {showdownload && <div className="overlay absolute w-full h-screen bg-[#0000005f] z-10 ">
          <div className="download flex px-5 py-5 gap-4 flex-col items-center absolute w-[300px] bg-[#1d1d1d] rounded-3xl border-2 border-zinc-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ">
            <h3 className='relative font-semibold capitalize text-center underline w-full'>available downloads<span className='absolute top-1/2 -translate-y-1/2 right-0 hover:bg-zinc-900 px-1 py-1 rounded-md' onClick={() => {
              setShowDownload(!showdownload);
            }}><GrFormClose /></span></h3>
            <a href={video_data?.formats[0]} target='_blank' download className='w-full py-2 cursor-pointer hover:bg-zinc-700 transition-all ease-in-out duration-300 outline-none focus:bg-zinc-700  text-center  bg-zinc-800 rounded-full'> <button >360p</button></a>
            <a href={video_data?.formats[1]} target='_blank' download className='w-full py-2 cursor-pointer hover:bg-zinc-700 transition-all ease-in-out duration-300 outline-none focus:bg-zinc-700  text-center  bg-zinc-800 rounded-full'>  <button >720p</button></a>
          </div>
        </div>}
        <div className="left w-full lg:w-[60%]">
          <div className='video w-[90%] m-auto'>
            {/* Video player */}
            <video src={video_data?.formats[1]} ref={videodimensions} controls className=' h-full max-h-[50vh)] rounded-xl'>
              <source />
            </video>
          </div>
          <div className="video-details px-[5%]">
            {/* Video title */}
            <h1 className='font-bold text-2xl pt-5 overflow-hidden text-ellipsis whitespace-nowrap'>{video.title}</h1>
            <div className='flex justify-between py-2 items-center'>
              {/* Display video views and download button */}
              <p className='text-xs text-zinc-500'>{(video.views / 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })}k views</p>
              <span onClick={() => {
                setShowDownload(!showdownload);
              }} className='bg-zinc-900 cursor-pointer px-3 py-3 rounded-[10px]'><IoMdDownload /></span>
            </div>
          </div>
        </div>
        <div className="right px-[5%] w-[40%] lg:px-0">
          <div className="description">
            {/* Video description */}
            <h2 className='font-semibold capitalize'> description</h2>
            <div className="video_description whitespace-pre-wrap ">
              {/* Render video description with URLs as links */}
              <span dangerouslySetInnerHTML={{ __html: (video.description.replace(urlRegex, '<a href="$1" className="underline text-sky-500" target="_blank">$1</a>')) }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Video; // Exporting Video component
