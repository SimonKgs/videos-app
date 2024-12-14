

import { likeVideo } from '@/actions/videos/videosActions';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props {
    videoId: string;
    likes: number;
}

/**
 * A component to display the number of likes for a video and allow the user to like it.
 * 
 * @param {string} videoId - The ID of the video to like.
 * @param {number} likes - The number of likes the video already has.
 * @returns {JSX.Element} A JSX element displaying the number of likes and a button to like the video.
 */
export const LikesVideo = ( { videoId, likes }: Props) => {

    
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    // TODO: CHECK WHY IS THIS RELOADING THE USER
    /**
     * Handles the logic when the user clicks the like button.
     * If the video is not already liked, it increments the like count and sets the liked state to true.
     */
    const onLiked = async () => {
        if (!isLiked) {
            setIsLiked(true);
        }
    }

    useEffect(() => {
    /**
     * Fetches the latest like count for the video from the server and updates the local state.
     * If the fetch is successful, it updates the currentLikes state with the new like count.
     */
        const fetchLikes = async () => {
            const updatedVideo = await likeVideo(videoId);
            if (updatedVideo) {
                setCurrentLikes(updatedVideo.likes);
            }
        }
        fetchLikes();
    }, [isLiked]);


    useEffect(() => {
        setIsLiked(false);
    }, [videoId]);

    return (
        <div className="flex gap-2 py-2 items-center">
            <div onClick={onLiked}>
                {
                isLiked ? (
                    <FaHeart color="red" />
                ) : (
                    <FaRegHeart cursor={"pointer"} />
                )
                }
            </div>
            <p className="flex gap-2">{ currentLikes } <span className="hidden sm:block">Likes</span></p>
        </div>
    )
}
