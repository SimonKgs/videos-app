import { getAllVideos } from '@/actions/videos/videosActions';
import VideoGalleryClient from './VideoGalleryClient';
import { Video } from '@prisma/client';

/**
 * Asynchronously fetches all videos from the database and renders the VideoGalleryClient component.
 * If the fetched videos are null, it defaults to an empty array.
 *
 * @returns {JSX.Element} The VideoGalleryClient component populated with the list of videos.
 */

export const VideoGallery = () => {
  // Fetch videos from the database

  // Handle the `null` case by providing an empty array as the default
  return <VideoGalleryClient />;
};
