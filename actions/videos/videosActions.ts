'use server';
import prisma from "@/lib/prisma";
import { Video } from "@prisma/client";
import { NextResponse } from "next/server";

interface Props {
    videoName: string;
    videoFile: File;
    userId: string;
}

/**
 * Uploads a video file to Cloudinary and creates a video record in the database.
 *
 * @param videoName - The desired public ID for the video on Cloudinary.
 * @param videoFile - The video file to be uploaded.
 * @param userId - The ID of the user uploading the video.
 *
 * @returns A promise that resolves to an object containing a message, status code, and a boolean indicating success.
 *
 * @throws Will throw an error if Cloudinary credentials are missing, the video file is invalid, or the upload fails.
 */

export const uploadVideo = async ({videoName, videoFile, userId}: Props) => {

    const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      return NextResponse.json(
        { message: 'Missing Cloudinary credentials' },
        { status: 500 }
      );
    }

    if (!videoFile || !(videoFile instanceof Blob)) {
      return NextResponse.json(
        { message: 'Invalid video file' },
        { status: 400 }
      );
    }
    
    const cloudinaryUrl = `${CLOUDINARY_URL}/${CLOUDINARY_CLOUD_NAME}/video/upload`;
  
    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', videoFile);
      cloudinaryFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const public_id = videoName + Date.now().toString();

      if (videoName !== null) {
          cloudinaryFormData.append('public_id', public_id);
      }
  
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: cloudinaryFormData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        return { 
          message: 'Failed to upload video to Cloudinary', 
          error,
          ok: false,
          code: 500
        }
      }

      const data = await response.json();
      console.log('THIS DATA',data);

      const videoRecord = {
        accessMode: data.access_mode || "public", // Replace with default if not available
        assetId: data.asset_id,
        bytes: data.bytes,
        folder: data.folder || null, // Nullable field
        format: data.format,
        height: data.height,
        name: data.original_filename || null, // Use the original filename or null
        publicId: data.public_id,
        resourceType: data.resource_type,
        secureUrl: data.secure_url,
        type: data.type || "upload", // Replace with default if not available
        url: data.url,
        version: data.version,
        width: data.width,
      };
      
      
  
      if (videoRecord) {
        await prisma.video.create({
          data: {
            ...videoRecord,
            name: videoName,
            userId
          }
        })
      } else {
        console.log('NO DATA');
      }
      

      return { 
        message: 'Video uploaded successfully', 
        url: data.secure_url,
        ok: true,
        code: 200
      }
      
    } catch (error) {
      return {
        error: (error as Error).message,
        code: 500,
        ok: false
      }
    }
};

/**
 * Fetches all videos from the database, including user information for each video.
 *
 * @returns {Promise<Video[] | null>} A promise that resolves to an array of video objects 
 * including associated user data, or null if an error occurs.
 *
 * @throws Will throw an error if there is an issue retrieving the videos from the database.
 */

export const getAllVideos = async (): Promise<Video[]|null> => {
    try {
        const videos = await prisma.video.findMany({
            include: {
                user:  {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        console.log('Videos', videos);
        

        return videos

    } catch ( err ){
        console.log(err);
        throw new Error('Error al obtener todos los videos');
    }
}


/**
 * Fetches all videos uploaded by a specific user.
 *
 * @param userId - The ID of the user whose videos are being fetched.
 * @returns {Promise<Video[] | null>} An array of video objects or null if an error occurs.
 */
export const getUserVideos = async (userId: string): Promise<Video[] | null> => {
    try {
        const userVideos = await prisma.video.findMany({
        where: { userId },
        include: {
            user: {
            select: { id: true, name: true }
            }
        }
        });

        return userVideos;
    } catch (error) {
        console.error('Error fetching user videos:', error);
        throw new Error('Failed to fetch videos for the specified user.');
    }
};


/**
 * Adds a like to a specific video.
 *
 * @param videoId - The ID of the video to like.
 * @returns {Promise<Video | null>} The updated video object or null if an error occurs.
 */
export const likeVideo = async (videoId: string): Promise<Video | null> => {
    try {
        const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: {
            likes: {
            increment: 1
            }
        }
        });

        return updatedVideo;
    } catch (error) {
        console.error('Error liking video:', error);
        throw new Error('Failed to like the video.');
    }
};
  

/**
 * Increments the view count for a specific video.
 *
 * @param videoId - The ID of the video being watched.
 * @returns {Promise<Video | null>} The updated video object or null if an error occurs.
 */
export const incrementVideoViews = async (videoId: string): Promise<Video | null> => {
    try {
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: {
          timesWatched: {
            increment: 1
          }
        }
      });
  
      return updatedVideo;
    } catch (error) {
      console.error('Error incrementing video views:', error);
      throw new Error('Failed to update video view count.');
    }
};
  