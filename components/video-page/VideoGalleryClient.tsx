'use client';
import { useEffect, useState } from 'react';
import { Video } from '@prisma/client';
import { MainVideo } from './main-video/MainVideo';
import { GridList } from './grid/GridList';
import { getAllVideos, getVideoById } from '@/actions/videos/videosActions';


const VideoGalleryClient: React.FC = () => {

  const [videos, setVideos] = useState<Video[] | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video|null>(null);


  const onChangeVideo = async (videoId: string) => {    
    try {
      const video = await getVideoById(videoId);
      setCurrentVideo(video);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getAllVideos();
        setVideos(videos);
  
        if (videos && videos.length > 0) {
          setCurrentVideo(videos[0]); // Set the first video as the initial one
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-start">
      <h1 className='text-2xl sm:text-4xl font-extrabold mt-2 sm:my-10'>VideoGallery</h1>

      <div className="flex flex-col w-full justify-center items-center max-w-screen-xl">
      {
        currentVideo ? (
            <MainVideo video={currentVideo} />
        ) 
        : 
        (
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-2 sm:my-10">No videos found</h1>
        )
      }

      {
        videos && videos.length > 1 && (
          <GridList videos={videos}  onChangeVideo={onChangeVideo} />        ) 
      }
      </div>
    </div>
  );
};

export default VideoGalleryClient;
