import { Video } from '@/interfaces'

interface Props {
    video: Video
}

export const GridItem = ({ video }: Props) => {
  return (
    <div className='min-h-44 border-2 border-black'>
        <p className='py-2'>{ video.public_id }</p>
        <video src={video.url}></video>
    </div>
  )
}
