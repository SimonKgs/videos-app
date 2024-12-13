import { Videos, Video } from '../../../interfaces/videos.interface';
import { GridItem } from './GridItem';

interface Props {
    videos: Video[],
    setCurrentVideo: React.Dispatch<React.SetStateAction<number>>
}


export const GridList = ({ videos, setCurrentVideo }: Props) => {
    
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 min-h-96 gap-4'>
            {
                videos.map((video: Video) => (
                    <div
                        onClick={() => setCurrentVideo(videos.indexOf(video))} 
                        key={`${video.assetId}_div`} 
                        className='min-h-44 border-2 border-black'
                    >
                        <GridItem  key={video.assetId} video={video} />
                    </div>
                ))
            }
        </div>
    )
}
