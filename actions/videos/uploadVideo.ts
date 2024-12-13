'use server';
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
    videoName: string;
    videoFile: File;
    userId: string;
}

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

      if (videoName !== null) {
          cloudinaryFormData.append('public_id', videoName);
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