import { Video } from '@/interfaces'

interface Props {
    video: Video
}

export const GridItem = ({ video }: Props) => {
  return (
    <>
        <p className='py-2 font-semibold capitalize'>{ video.name }</p>
        <hr className='bg-white my-1'/>
        <video className="max-h-44 bg-black w-full" src={video.secureUrl}></video>
    </>
  )
}
