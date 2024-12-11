'use client';
import { useParams } from 'next/navigation';
import { GridList, MainVideo } from "@/components";
import { initialData } from "@/seed/seed";
import { useState } from 'react';

const videos = initialData.resources

export const VideoGallery = () => {

    const [currentVideo, setCurrentVideo] = useState(0);
    // this line extracts the id from the dynamic route
    const { id } = useParams();
    console.log('ID FROM DYNAMIC ROUTE', id);

    // TODO: Load Videos from the DB using an API endpoint


    return (
        <div className='flex flex-col'>
            VideoGallery
            <MainVideo video={videos[currentVideo]} />
            <GridList videos={videos} />
        </div>
    )
}
