import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const currenTrailer = useSelector(store=> store.movies.currenTrailer)
    //Early return
    if (!movies) return;
    const mainMovie = movies[11];
    const { original_title, overview, id} = currenTrailer ? currenTrailer : mainMovie;
    return (
        <div className="pt-[30%] bg-black md:pt-0">
            <VideoTitle title={original_title} overview={overview.slice(0,150)}  />
            <VideoBackground movieId={id}/>
        </div>
    );
};

export default MainContainer;
