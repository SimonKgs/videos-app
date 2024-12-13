import prisma from "@/lib/prisma";

export const getVideoById = async (id: string) => {

    try {

        const video = await prisma.video.findFirst({
            where: {
                id
            }
        })

        if (!video) return null;

        return video

    } catch ( err ){
        console.log(err);
        throw new Error('Error al obtener el video por id');
    }

}