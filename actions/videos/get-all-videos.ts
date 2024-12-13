import prisma from "@/lib/prisma";
import { Video } from "@prisma/client";

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

        return videos

    } catch ( err ){
        console.log(err);
        throw new Error('Error al obtener todos los videos');
    }
}