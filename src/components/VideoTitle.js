const VideoTitle = ({ title, overview, onPlayVideo }) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-6 md:px-8 absolute bg-gradient-to-r from-brand-black"> {/* md:px-12 to md:px-8 */}
            <h1 className="text-2xl md:text-5xl font-semibold text-brand-light-gray">
                {title}
            </h1>
            <p className="py-4 text-lg w-1/2 text-brand-light-gray hidden md:inline-block"> {/* py-6 to py-4 */}
                {overview}
            </p>
            <div className="my-4 md:m-0 flex">
                <button 
                    onClick={onPlayVideo}
                    className="px-4 py-2 md:px-6 rounded-lg bg-brand-light-gray text-brand-dark font-bold flex items-center hover:bg-opacity-80 transition" /* Adjusted padding, added items-center */
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                    </svg>
                    <span>Play</span>
                </button>
                <button className="bg-brand-gray bg-opacity-70 hidden md:flex items-center px-4 py-2 mx-2 rounded-lg text-brand-light-gray font-bold hover:bg-opacity-60 transition"> {/* Adjusted padding, added items-center */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                    </svg>
                    <span>More Info</span>
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
