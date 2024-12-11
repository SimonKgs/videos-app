import { Video } from "@/interfaces"

interface Props {
  video: Video
}

export const MainVideo = ({ video }: Props) => {
  return (
    <div className="flex w-full justify-center min-h-96 border-2 border-black my-10">
        { video.public_id }
    </div>
  )
}
