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
    <div className="flex flex-col">
      VideoGallery
      {videos && videos.length > 0 && (
        <div className="flex flex-col w-full justify-center items-center">
          <MainVideo video={videos[currentVideo]} setCurrentVideo={setCurrentVideo} videosLength={videos.length} />
          <GridList videos={videos} setCurrentVideo={setCurrentVideo} />
        </div>
      )}
    </div>
  );
};

export default VideoGalleryClient;
