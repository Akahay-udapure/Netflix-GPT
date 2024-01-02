const VideoTitle = ({ title, overview}) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-6 md:px-12 absolute bg-gradient-to-r from-black">
            <h1 className="text-2xl md:text-5xl font-semibold text-white">{title}</h1>
            <p className="py-6 text-lg w-1/2 text-white hidden md:inline-block">{overview}</p>
            <div className="my-4 md:m-0">
                <button className="p-2 md:p-2 md:px-6 rounded-lg bg-white text-black font-bold">
                    ▶️ Play
                </button>
                <button className="bg-gray-500 bg-opacity-50 hidden md:inline-block p-2 px-4 mx-2 rounded-lg text-white font-bold">
                    ℹ️ More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
