// import axios from "axios";

// const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

// const getYoutubeVideo = async (query: string) => {
//   const params = {
//     part: "snippet",
//     maxResult: 2,
//     q: query,
//     key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
//   };

//   const resp = await axios.get(YOUTUBE_BASE_URL + "/search/" + params);

//   return resp.data.items;
// };

// export default getYoutubeVideo;



const getYoutubeVideo = async (query: string) => {
  const res = await fetch('/api/youtube', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const data = await res.json()
  return data
}

export default getYoutubeVideo
