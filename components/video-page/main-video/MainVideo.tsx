'use client';

import { Video } from "@/interfaces"
import { useState } from "react"
import { FaEye} from "react-icons/fa"
import { LikesVideo } from "./LikesVideo";

interface Props {
  video: Video,
  setCurrentVideo: React.Dispatch<React.SetStateAction<number>>,
  videosLength: number
}

export const MainVideo = ({ video, setCurrentVideo, videosLength }: Props) => {


  const onEnded = () => {
    console.log('Ended');
    
    
    setCurrentVideo((currentVideo) => {
      return (currentVideo + 1) % videosLength
    })
  }

  const onPlaying = () => {
    console.log('Playing', video.id);
  }

  return (
    <div className="flex flex-col w-full justify-center min-h-64 sm:min-h-96 mt-4 mb-8 sm:my-10">
      <video 
        src={video.url} 
        controls 
        onEnded={onEnded}
        onPlaying={onPlaying} 
      />
      <div className="flex items-center justify-between bg-black text-white px-2">
        <LikesVideo likes={video.likes} videoId={video.id} />
        <p className="text-lg">{ (video.name)?.toUpperCase() }</p>
        <div className="flex gap-2 items-center">
          <FaEye />
          <p className="flex gap-2">{ video.timesWatched } <span className="hidden sm:block">Views</span></p>
        </div>
      </div>
    </div>
  )
}
