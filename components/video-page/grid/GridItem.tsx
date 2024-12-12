import { Video } from '@/interfaces'

interface Props {
    video: Video
}

export const GridItem = ({ video }: Props) => {
  return (
    <>
        <p className='py-2'>{ video.public_id }</p>
        <video src={video.url}></video>
    </>
  )
}
