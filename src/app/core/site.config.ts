export const SITE_CONFIG = {
  name: 'GNOD Technologies',
  origin: 'https://gnod-tech.co.za',
  phoneDisplay: '012 663 3699',
  phoneHref: 'tel:+27126633699',
  email: 'info@gnod-tech.co.za',
  address: '59 Blinkblaar, Zwartkop, Centurion, 0157, Gauteng, South Africa',
  shortAddress: 'Zwartkop, Centurion, South Africa',
  /** The quote form posts here (public/api/contact.php on the same hosting). */
  formEndpoint: '/api/contact.php',
  /**
   * Google Cloud reCAPTCHA site keys. They are public by design; the secret API key lives
   * only on the server (AGENTS.md §12.3). While empty, reCAPTCHA is skipped entirely.
   */
  recaptcha: {
    /** Key for gnod-tech.co.za. */
    productionSiteKey: '' as string,
    /** Key for localhost. */
    developmentSiteKey: '' as string,
  },
} as const;

export interface SeoRouteData {
  readonly title: string;
  readonly description: string;
  /** Keep the page out of search results (AGENTS.md §8.2). */
  readonly noindex?: boolean;
  /** Set to false for pages without a canonical address (the 404 page). */
  readonly canonical?: boolean;
}
