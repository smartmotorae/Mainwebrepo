import { google } from 'googleapis';

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n') || process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartmotor.ae';

export class GoogleIndexingAPI {
  private auth: any;

  constructor() {
    this.auth = new google.auth.JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
  }

  async publishUrl(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await google.indexing({ version: 'v3', auth: this.auth });
      
      await response.urlNotifications.publish({
        requestBody: {
          type: 'URL_UPDATED',
          url: url,
        },
      });

      console.log(`✅ Indexed: ${url}`);
      return { success: true };
    } catch (error: any) {
      console.error(`❌ Failed to index ${url}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  async removeUrl(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await google.indexing({ version: 'v3', auth: this.auth });
      
      await response.urlNotifications.publish({
        requestBody: {
          type: 'URL_DELETED',
          url: url,
        },
      });

      console.log(`✅ Removed from index: ${url}`);
      return { success: true };
    } catch (error: any) {
      console.error(`❌ Failed to remove ${url}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  async getUrlMetadata(url: string): Promise<any> {
    try {
      const response = await google.indexing({ version: 'v3', auth: this.auth });
      
      const result = await response.urlNotifications.getMetadata({
        url: url,
      });

      return result.data;
    } catch (error: any) {
      console.error(`❌ Failed to get metadata for ${url}:`, error.message);
      return null;
    }
  }
}

export const indexingAPI = new GoogleIndexingAPI();

export const INDEXABLE_ROUTES = [
  '',
  '/contact',
  '/about',
  '/services',
  '/smart-tips',
  '/packages',
  '/faq',
  '/careers',
  '/privacy',
  '/terms',
  '/extras',
  '/extras/diagnostics',
  '/extras/ceramic',
  '/extras/tinting',
  '/extras/repair',
  '/extras/resale-value',
  '/extras/ac-efficiency',
  '/extras/oil-viscosity',
  '/extras/tire-lab',
  '/extras/sound-analyzer',
  '/hub',
  '/hub/traffic-fines',
  '/hub/regulations',
  '/hub/summer-safety',
  '/location/abudhabi',
  '/location/dubai',
  '/location/sharjah',
];

export function getAllIndexableUrls(
  services: Array<{ slug: string }>,
  brands: Array<{ slug: string }>,
  posts: Array<{ slug: string }>
): string[] {
  const baseUrl = SITE_URL;
  const urls: string[] = [];

  INDEXABLE_ROUTES.forEach(route => {
    urls.push(`${baseUrl}${route}`);
  });

  services.forEach(service => {
    urls.push(`${baseUrl}/services/${service.slug}`);
  });

  brands.forEach(brand => {
    urls.push(`${baseUrl}/brand/${brand.slug}`);
    services.forEach(service => {
      urls.push(`${baseUrl}/brand/${brand.slug}/${service.slug}`);
    });
  });

  posts.forEach(post => {
    urls.push(`${baseUrl}/smart-tips/${post.slug}`);
  });

  return urls;
}
