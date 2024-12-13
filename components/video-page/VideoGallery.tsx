import { getAllVideos } from '@/actions/videos/get-all-videos';
import VideoGalleryClient from './VideoGalleryClient';
import { Videos } from '@/interfaces';
import { Video } from '@prisma/client';

export const VideoGallery = async () => {
  // Fetch videos from the database
  const videos: Video[] | null = await getAllVideos();

  // Handle the `null` case by providing an empty array as the default
  return <VideoGalleryClient videos={videos || []} />;
};
