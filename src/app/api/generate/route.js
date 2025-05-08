// app/api/generate/route.ts

export async function POST(req) {
    const api_key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const { prompt } = await req.json();
     
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json",
        // "HTTP-Referer": "https://your-site.com", // optional
        "X-Title": "Still Learning", // optional
      },
      body: JSON.stringify({
        // model: "gemini-2.5-pro-preview-03-25",
        model: "google/gemini-2.0-flash-001",
        // model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      console.error("Server error:", error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
  
    const data = await res.json();
    return new Response(JSON.stringify(data));
  }
  