import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const getYoutubeVideo = async (query: string) => {
  const params = {
    part: "snippet",
    maxResult: 2,
    q: query,
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };

  const resp = await axios.get(YOUTUBE_BASE_URL + "/search" + { params });

  return resp.data.items;
};

export default getYoutubeVideo;
