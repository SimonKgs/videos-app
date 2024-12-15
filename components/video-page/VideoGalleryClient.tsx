'use client';
import { useEffect, useState } from 'react';
import { Video } from '@prisma/client';
import { MainVideo } from './main-video/MainVideo';
import { GridList } from './grid/GridList';
import { getVideoById, getVideoCount, getVideos } from '@/actions/videos/videosActions';
import { CustomButton } from '../shared/ui/custom-button/CustomButton';

const START_INDEX = 0;
const INDEX_INCREMENT = 6;

const VideoGalleryClient: React.FC = () => {

  const [videos, setVideos] = useState<Video[] | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video|null>(null);
  const [totalVideos, setTotalVideos] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);


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
        const videos = await getVideos(currentIndex);
        setVideos(videos);
        const totalVideos = await getVideoCount();
        setTotalVideos(totalVideos);

        if (videos && videos.length > 0) {
          setCurrentVideo(videos[0]); // Set the first video as the initial one
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    console.log('TRYING TO GET MORE VIDEOS', currentIndex, );
    
    const fetchVideos = async () => {
      try {
        const videos = await getVideos(currentIndex);
        console.log('MORE VIDEOS', videos);
        
        setVideos(videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, [currentIndex]);

  return (
    <div className="flex flex-col justify-center items-center text-start">
      <h1 className='text-2xl sm:text-4xl font-extrabold mt-2 sm:my-4'>VideoGallery</h1>

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
        videos && videos.length > 0 && (
          <GridList videos={videos}  onChangeVideo={onChangeVideo} />        ) 
      }

      <div className='flex items-center justify-center gap-10 w-full py-5'>
        <div>
          {
            currentIndex - INDEX_INCREMENT >= START_INDEX && (
              <CustomButton className='bg-blue-600 text-white hover:bg-blue-800' text="Previous Videos" attachedFunction={() => setCurrentIndex(currentIndex - INDEX_INCREMENT)} />
            )
          }
        </div>
        <div>
          {
            currentIndex < totalVideos && (
              <CustomButton className='bg-blue-600 text-white hover:bg-blue-800' text="Next Videos" attachedFunction={() => setCurrentIndex(currentIndex + INDEX_INCREMENT)} />
            )
          }
        </div>
      </div>
      </div>
    </div>
  );
};

export default VideoGalleryClient;
