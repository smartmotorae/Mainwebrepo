import { NextRequest, NextResponse } from 'next/server';
import { indexingAPI, getAllIndexableUrls } from '@/lib/indexing';
import { adminGetAllServices, adminGetAllBrands, adminGetAllPublishedContent } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, urls } = body;

    if (!action || !['publish', 'remove', 'batch', 'status'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Use: publish, remove, batch, or status' },
        { status: 400 }
      );
    }

    if (action === 'status') {
      const url = body.url;
      if (!url) {
        return NextResponse.json({ error: 'URL is required for status check' }, { status: 400 });
      }
      const metadata = await indexingAPI.getUrlMetadata(url);
      return NextResponse.json({ metadata });
    }

    if (action === 'publish' || action === 'remove') {
      const url = body.url;
      if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
      }

      const result = action === 'publish' 
        ? await indexingAPI.publishUrl(url)
        : await indexingAPI.removeUrl(url);

      return NextResponse.json(result);
    }

    if (action === 'batch') {
      const results: Array<{ url: string; success: boolean; error?: string }> = [];
      
      let urlsToIndex = urls;

      if (!urlsToIndex || urlsToIndex.length === 0) {
        console.log('Fetching all content for batch indexing...');
        
        const [services, brands, posts] = await Promise.all([
          adminGetAllServices(),
          adminGetAllBrands(),
          adminGetAllPublishedContent('BLOG'),
        ]);

        urlsToIndex = getAllIndexableUrls(services, brands, posts);
      }

      console.log(`📤 Starting batch indexing of ${urlsToIndex.length} URLs...`);

      for (const url of urlsToIndex) {
        const result = await indexingAPI.publishUrl(url);
        results.push({ url, ...result });
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;

      console.log(`✅ Batch indexing complete: ${successCount} succeeded, ${failCount} failed`);

      return NextResponse.json({
        success: true,
        total: urlsToIndex.length,
        succeeded: successCount,
        failed: failCount,
        results: results.slice(0, 50),
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('Indexing API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Google Indexing API endpoint',
    usage: 'POST with { action: "publish" | "remove" | "batch" | "status", url?: string, urls?: string[] }',
    note: 'The batch action will automatically fetch all services, brands, and blog posts if no urls provided'
  });
}
