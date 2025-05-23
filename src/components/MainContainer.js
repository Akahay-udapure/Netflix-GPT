import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useState } from "react";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const currenTrailer = useSelector(store => store.movies.currenTrailer);
    const [isMuted, setIsMuted] = useState(true); // Video is muted by default

    //Early return
    if (!movies) return;
    const mainMovie = movies[11];
    const { original_title, overview, id } = currenTrailer ? currenTrailer : mainMovie;

    const handleToggleMute = () => {
        setIsMuted(!isMuted);
    };
    
    // This function is specifically for the "Play" button in VideoTitle
    // to ensure video plays unmuted.
    const playMainVideoUnmuted = () => {
        if (isMuted) {
            setIsMuted(false);
        }
        // If already unmuted, it will continue playing.
    };

    const truncateOverview = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        const lastSpace = text.lastIndexOf(' ', maxLength);
        if (lastSpace > 0) {
            return text.substring(0, lastSpace) + "...";
        } else {
            return text.substring(0, maxLength) + "...";
        }
    };

    return (
        <div className="pt-[15%] bg-brand-dark md:pt-0">
            <VideoTitle 
                title={original_title} 
                overview={truncateOverview(overview, 150)} // Using the helper function
                onPlayVideo={playMainVideoUnmuted}
            />
            <VideoBackground 
                movieId={id} 
                isMuted={isMuted} 
                onToggleMute={handleToggleMute} // For mute/unmute button in VideoBackground
            />
        </div>
    );
};

export default MainContainer;
