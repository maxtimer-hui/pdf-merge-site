import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow, submitBatchToIndexNow } from '@/lib/indexnow';

/**
 * IndexNow API Route
 * POST /api/indexnow
 *
 * Submit URLs to IndexNow for immediate indexing
 *
 * Request body:
 * {
 *   "urls": ["https://example.com/page1", "https://example.com/page2"]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    // Validate request
    if (!urls) {
      return NextResponse.json(
        { error: 'URLs are required' },
        { status: 400 }
      );
    }

    // Handle single URL (convert to array)
    const urlsArray = Array.isArray(urls) ? urls : [urls];

    // Validate URLs
    const validUrls: string[] = [];
    const invalidUrls: string[] = [];

    for (const url of urlsArray) {
      try {
        const parsedUrl = new URL(url);
        // Only allow http/https protocols
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
          validUrls.push(url);
        } else {
          invalidUrls.push(url);
        }
      } catch {
        invalidUrls.push(url);
      }
    }

    if (validUrls.length === 0) {
      return NextResponse.json(
        {
          error: 'No valid URLs provided',
          invalidUrls
        },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const result = validUrls.length === 1
      ? await submitToIndexNow(validUrls[0])
      : await submitBatchToIndexNow(validUrls);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        submittedUrls: validUrls,
        invalidUrls
      });
    } else {
      return NextResponse.json(
        {
          error: result.message,
          submittedUrls: validUrls,
          invalidUrls
        },
        { status: result.statusCode || 500 }
      );
    }

  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check API status
 */
export async function GET() {
  const apiKey = process.env.INDEXNOW_API_KEY;

  return NextResponse.json({
    status: 'IndexNow API is ready',
    configured: !!apiKey,
    keyLocation: apiKey ? `https://combinepdffree.net/${apiKey}.txt` : null
  });
}
