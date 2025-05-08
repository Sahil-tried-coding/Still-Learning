import { NextResponse } from 'next/server'

export async function POST(req) {
  const { query } = await req.json()

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=1`;

//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=1`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
  } catch  {
    return NextResponse.json({ error : 'Failed to fetch from YouTube' }, { status: 500 })
  }
}
