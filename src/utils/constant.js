export const NETFLIX_LOGO =
    "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const BG_IMG =
    "https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer " + process.env.REACT_APP_TMDB_KEY,
    },
};

export const USER_AVATAR =
    "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e";

export const IMG_CDN = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGAUGE = [
    { identifier: "en", name: "English" },
    { identifier: "hindi", name: "Hindi" },
    { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_SECRET_KEY = process.env.REACT_APP_OPENAI_KEY
