import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    const showGPTSearch = useSelector((store)=> store.gpt.showGPTSearch);
    return (
        <div>
            <Header />
            {
               showGPTSearch ? <GptSearch /> : <>
                    <MainContainer />
                    <SecondaryContainer />
                </>
            }
            {/**
                MainContainer
                    - VedioBackground
                    - VideoTitle
                SecondaryContainer
                    - MoviesList * n
                    - cards * n
             */}
        </div>
    );
};

export default Browse;
