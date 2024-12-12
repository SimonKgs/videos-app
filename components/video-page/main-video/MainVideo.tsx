import { Video } from "@/interfaces"
import { on } from "events"

interface Props {
  video: Video,
  setCurrentVideo: React.Dispatch<React.SetStateAction<number>>,
  videosLength: number
}

export const MainVideo = ({ video, setCurrentVideo, videosLength }: Props) => {

  const onEnded = () => {
    
    setCurrentVideo((currentVideo) => {
      return (currentVideo + 1) % videosLength
    })
  }

  return (
    <div className="flex w-full justify-center min-h-96 border-2 border-black my-10">
      <video src={video.url} controls onEnded={onEnded}></video>
    </div>
  )
}
