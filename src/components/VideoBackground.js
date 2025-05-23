import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId, isMuted, onToggleMute }) => {
    useMovieTrailer(movieId);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    // Construct the src URL dynamically based on isMuted prop
    const srcUrl = trailerVideo?.key
        ? `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=${isMuted ? 1 : 0}`
        : "";

    return (
        <div className="w-screen relative">
            {srcUrl && (
                <iframe
                    className="w-screen aspect-video"
                    src={srcUrl}
                    key={srcUrl} // Add key to force re-render when srcUrl changes
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            )}
            <button
                onClick={onToggleMute}
                className="absolute bottom-5 right-5 bg-black bg-opacity-50 text-white px-4 py-2 rounded hover:bg-opacity-75 transition-opacity duration-300 z-10"
            >
                {isMuted ? "Unmute" : "Mute"}
            </button>
        </div>
    );
};

export default VideoBackground;
