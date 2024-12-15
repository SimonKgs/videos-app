import { Dispatch, SetStateAction } from 'react';
import { Videos, Video } from '../../../interfaces/videos.interface';
import { GridItem } from './GridItem';

interface Props {
    videos: Video[],
    onChangeVideo:  (videoId: string) => Promise<void>
}


export const GridList = ({ videos, onChangeVideo }: Props) => {
    
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {
                videos.map((video: Video) => (
                    <div
                        onClick={() => onChangeVideo(video.id)} 
                        key={`${video.assetId}_div`} 
                        className='flex flex-col min-h-44 cursor-pointer bg-black rounded p-2 text-white'
                    >
                        <GridItem key={video.assetId} video={video} />
                    </div>
                ))
            }
        </div>
    )
}
