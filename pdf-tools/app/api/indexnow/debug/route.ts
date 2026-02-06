import { NextRequest, NextResponse } from 'next/server';

/**
 * Debug endpoint for IndexNow
 * Shows what would be sent to IndexNow API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;
    const apiKey = process.env.INDEXNOW_API_KEY;

    const urlsArray = Array.isArray(urls) ? urls : [urls];
    const firstUrl = urlsArray[0];

    const parsedUrl = new URL(firstUrl);

    // Remove www prefix for IndexNow compatibility
    let host = parsedUrl.hostname;
    if (host.startsWith('www.')) {
      host = host.slice(4);
    }

    const keyLocation = `${parsedUrl.protocol}//${parsedUrl.host}/${apiKey}.txt`;

    const payload = {
      host,
      key: apiKey,
      keyLocation,
      urlList: urlsArray
    };

    return NextResponse.json({
      debug: true,
      input: { urls, urlsArray },
      parsed: {
        originalUrl: firstUrl,
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        host: parsedUrl.host,
        finalHost: host,
        apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : null
      },
      payload
    });

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/indexnow/debug',
    method: 'POST',
    description: 'Debug endpoint to see what payload is sent to IndexNow',
    usage: {
      curl: 'curl -X POST https://combinepdffree.net/api/indexnow/debug -H "Content-Type: application/json" -d \'{"urls": "https://www.combinepdffree.net/en/merge"}\''
    }
  });
}
