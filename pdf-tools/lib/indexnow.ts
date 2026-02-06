/**
 * IndexNow API integration
 * Documentation: https://www.indexnow.org/documentation
 */

export interface IndexNowResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface IndexNowBatchRequest {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit a single URL to IndexNow
 */
export async function submitToIndexNow(url: string): Promise<IndexNowResponse> {
  try {
    const apiKey = process.env.INDEXNOW_API_KEY?.trim()?.trim();
    if (!apiKey) {
      throw new Error('INDEXNOW_API_KEY environment variable is not set');
    }

    const parsedUrl = new URL(url);
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
      urlList: [url]
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    const statusCode = response.status;

    // IndexNow returns 200 for success
    if (statusCode === 200) {
      return {
        success: true,
        statusCode,
        message: 'URL submitted successfully to IndexNow'
      };
    }

    // Handle error responses
    let errorMessage = 'Unknown error';
    switch (statusCode) {
      case 400:
        errorMessage = 'Invalid request format';
        break;
      case 403:
        errorMessage = 'Invalid API key or key file not found';
        break;
      case 422:
        errorMessage = 'URLs do not belong to the host or key mismatch';
        break;
      case 429:
        errorMessage = 'Too many requests (potential spam)';
        break;
      default:
        errorMessage = `HTTP ${statusCode}: ${response.statusText}`;
    }

    return {
      success: false,
      statusCode,
      message: errorMessage
    };

  } catch (error) {
    return {
      success: false,
      statusCode: 0,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Submit multiple URLs to IndexNow in batch
 */
export async function submitBatchToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  if (urls.length === 0) {
    return {
      success: false,
      statusCode: 400,
      message: 'No URLs provided'
    };
  }

  try {
    const apiKey = process.env.INDEXNOW_API_KEY?.trim();
    if (!apiKey) {
      throw new Error('INDEXNOW_API_KEY environment variable is not set');
    }

    // Use the first URL to determine host and protocol
    const firstUrl = new URL(urls[0]);
    // Remove www prefix for IndexNow compatibility
    let host = firstUrl.hostname;
    if (host.startsWith('www.')) {
      host = host.slice(4);
    }
    const keyLocation = `${firstUrl.protocol}//${firstUrl.host}/${apiKey}.txt`;

    const payload: IndexNowBatchRequest = {
      host,
      key: apiKey,
      keyLocation,
      urlList: urls
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    const statusCode = response.status;

    if (statusCode === 200) {
      return {
        success: true,
        statusCode,
        message: `Successfully submitted ${urls.length} URLs to IndexNow`
      };
    }

    let errorMessage = 'Unknown error';
    switch (statusCode) {
      case 400:
        errorMessage = 'Invalid request format';
        break;
      case 403:
        errorMessage = 'Invalid API key or key file not found';
        break;
      case 422:
        errorMessage = 'URLs do not belong to the host or key mismatch';
        break;
      case 429:
        errorMessage = 'Too many requests (potential spam)';
        break;
      default:
        errorMessage = `HTTP ${statusCode}: ${response.statusText}`;
    }

    return {
      success: false,
      statusCode,
      message: errorMessage
    };

  } catch (error) {
    return {
      success: false,
      statusCode: 0,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Submit a URL using GET method (simpler alternative)
 */
export async function submitToIndexNowGET(url: string): Promise<IndexNowResponse> {
  try {
    const apiKey = process.env.INDEXNOW_API_KEY?.trim();
    if (!apiKey) {
      throw new Error('INDEXNOW_API_KEY environment variable is not set');
    }

    const parsedUrl = new URL(url);
    const keyLocation = `${parsedUrl.protocol}//${parsedUrl.host}/${apiKey}.txt`;

    const params = new URLSearchParams({
      url: url,
      key: apiKey,
      keyLocation: keyLocation
    });

    const response = await fetch(`https://www.bing.com/indexnow?url=${params.toString()}`, {
      method: 'GET'
    });

    const statusCode = response.status;

    if (statusCode === 200) {
      return {
        success: true,
        statusCode,
        message: 'URL submitted successfully to IndexNow'
      };
    }

    let errorMessage = 'Unknown error';
    switch (statusCode) {
      case 400:
        errorMessage = 'Invalid request format';
        break;
      case 403:
        errorMessage = 'Invalid API key or key file not found';
        break;
      case 422:
        errorMessage = 'URLs do not belong to the host or key mismatch';
        break;
      case 429:
        errorMessage = 'Too many requests (potential spam)';
        break;
      default:
        errorMessage = `HTTP ${statusCode}: ${response.statusText}`;
    }

    return {
      success: false,
      statusCode,
      message: errorMessage
    };

  } catch (error) {
    return {
      success: false,
      statusCode: 0,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
