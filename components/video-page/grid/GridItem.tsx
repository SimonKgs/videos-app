import { Video } from '@/interfaces'

interface Props {
    video: Video
}

export const GridItem = ({ video }: Props) => {
  return (
    <>
        <p className='py-2'>{ video.name }</p>
        <video src={video.url}></video>
    </>
  )
}
