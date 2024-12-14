'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Video } from '@prisma/client';
import { MainVideo } from './main-video/MainVideo';
import { GridList } from './grid/GridList';

interface VideoGalleryClientProps {
  videos: Video[];
}

const VideoGalleryClient: React.FC<VideoGalleryClientProps> = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  
  return (
    <div className="flex flex-col justify-center items-center text-start">
      <h1 className='text-2xl sm:text-4xl font-extrabold mt-2 sm:my-10'>VideoGallery</h1>
      {videos && videos.length > 0 ? (
        <div className="flex flex-col w-full justify-center items-center max-w-screen-xl">
          <MainVideo video={videos[currentVideo]} setCurrentVideo={setCurrentVideo} videosLength={videos.length} />
          <GridList videos={videos} setCurrentVideo={setCurrentVideo} />
        </div>
      ) : (
        <p>No videos found</p>
      )
    }
    </div>
  );
};

export default VideoGalleryClient;
