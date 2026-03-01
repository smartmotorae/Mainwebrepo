import { google } from 'googleapis'

const GSC_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
const GSC_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartmotor.ae'

/**
 * Google Search Console API Wrapper
 */
export class GSCClient {
  private auth = new google.auth.JWT({
    email: GSC_CLIENT_EMAIL,
    key: GSC_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  })

  private searchConsole = google.searchconsole({ version: 'v1', auth: this.auth })

  /**
   * Fetches search performance data for a given date range.
   */
  async getPerformance(startDate: string, endDate: string) {
    try {
      const response = await this.searchConsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query', 'page'],
          rowLimit: 100,
        },
      })
      return response.data.rows || []
    } catch (error) {
      console.error('GSC Performance Fetch Error:', error)
      return []
    }
  }

  /**
   * Checks the index status of a specific URL.
   */
  async inspectUrl(url: string) {
    try {
      const response = await this.searchConsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: SITE_URL,
        },
      })
      return response.data.inspectionResult
    } catch (error) {
      console.error('GSC URL Inspection Error:', error)
      return null
    }
  }
}

export const gscClient = new GSCClient()
