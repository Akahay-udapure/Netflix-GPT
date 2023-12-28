const VideoTitle = ({ title, overview}) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-12 absolute bg-gradient-to-r from-black">
            <h1 className="text-6xl font-semibold text-white">{title}</h1>
            <p className="py-6 text-lg w-1/2 text-white">{overview}</p>
            <div>
                <button className="p-2 px-6 rounded-lg bg-white text-black font-bold">
                    ▶️ Play
                </button>
                <button className="bg-gray-500 bg-opacity-50 p-2 px-4 mx-2 rounded-lg text-white font-bold">
                    ℹ️ More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
