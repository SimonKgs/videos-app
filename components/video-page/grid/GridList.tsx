import { Videos, Video } from '../../../interfaces/videos.interface';
import { GridItem } from './GridItem';

export const GridList = ({ videos }: Videos) => {
    
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 min-h-96 gap-4'>
            {
                videos.map((video: Video) => (
                    <GridItem  key={video.asset_id} video={video} />
                ))
            }
        </div>
    )
}
