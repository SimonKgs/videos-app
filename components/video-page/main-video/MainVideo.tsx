'use client';

import { Video } from "@/interfaces"
import { useCallback, useEffect, useState } from "react"
import { FaEye, FaHeart, FaRegHeart} from "react-icons/fa"
import { incrementVideoViews, likeVideo } from "@/actions/videos/videosActions";

interface Props {
  video: Video,

}

export const MainVideo = ({ video }: Props) => {

    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [likes, setLikes] = useState(video.likes);
    const [views, setViews] = useState(video.timesWatched);
  
    // Sync state on changes
    useEffect(() => {
      setCurrentVideo(video);
      setLikes(video.likes);
      setViews(video.timesWatched);
      setIsLiked(false);
      setIsWatched(false);
    }, [video]);
  
    // Handle when the video ends
    const onEnded = useCallback(() => {
      console.log('Video ended:', currentVideo?.id);
    }, [currentVideo]);
  
    // Handle when the video starts playing
    const onPlay = useCallback(async () => {
      if (!isWatched) {
        setIsWatched(true);
        setViews(prevViews => prevViews + 1);
      }
      try {
        const updatedVideo = await incrementVideoViews(currentVideo!.id);
        if (updatedVideo) {
          setCurrentVideo(updatedVideo);
        }
      } catch (error) {
        console.error('Error updating video views:', error);
      }
    }, [currentVideo, isWatched]);
  
    // Handle like button click
    const onLike = useCallback(async () => {
      if (!isLiked) {
        setIsLiked(true);
        setLikes(prevLikes => prevLikes + 1); // Optimistic UI update
      }
      try {
        const updatedVideo = await likeVideo(currentVideo!.id);
        if (updatedVideo) {
          setCurrentVideo(updatedVideo);
        }
      } catch (error) {
        console.error('Error liking video:', error);
      }
    }, [currentVideo, isLiked]);
  
    
  return (
    <div className="flex flex-col w-full justify-center min-h-64 sm:min-h-96 mt-4 mb-4 sm:my-10">
      <video 
        className=" max-h-[50vh] bg-black"
        src={video.secureUrl} 
        controls 
        onEnded={onEnded}
        onPlay={onPlay} 
      />
      <div className="flex items-center justify-between bg-black text-white px-2">
        <div className="flex gap-2 py-2 items-center">
            <div onClick={isLiked ? () => {} : onLike}>
                {
                isLiked ? (
                    <FaHeart color="red" />
                ) : (
                    <FaRegHeart cursor={"pointer"} />
                )
                }
            </div>
            <p className="flex gap-2">{ likes } <span className="hidden sm:block">Likes</span></p>
        </div>
        <p className="text-lg">{ (video.name)?.toUpperCase() }</p>
        <div className="flex gap-2 items-center">
          <FaEye />
          <p className="flex gap-2">{ views } <span className="hidden sm:block">Views</span></p>
        </div>
      </div>
    </div>
  )
}
