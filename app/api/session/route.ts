import { NextResponse } from 'next/server';

export async function POST() {
  const API_KEY = process.env.HB_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_url: "https://google.com",
        offline_timeout: 7200, // 2 hours
        tag: "my-main-browser",

        // SET REGION TO ASIA
        // Options are: "NA" (North America), "EU" (Europe), "AS" (Asia)
        region: "AS" 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: "Connection to Hyperbeam failed" }, { status: 500 });
  }
}