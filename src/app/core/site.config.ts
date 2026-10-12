export const SITE_CONFIG = {
  name: 'GNOD Technologies',
  origin: 'https://gnod-tech.co.za',
  phoneDisplay: '012 663 3699',
  phoneHref: 'tel:+27126633699',
  email: 'info@gnod-tech.co.za',
  address: '59 Blinkblaar, Zwartkop, Centurion, 0157, Gauteng, South Africa',
  shortAddress: 'Zwartkop, Centurion, South Africa',
  // Quote requests are delivered by FormSubmit (https://formsubmit.co). The first
  // submission to a new address sends an "Activate Form" email that must be confirmed.
  formEndpoint: 'https://formsubmit.co/ajax/info@gnod-tech.co.za',
} as const;

export interface SeoRouteData {
  readonly title: string;
  readonly description: string;
  /** Keep the page out of search results (AGENTS.md §8.2). */
  readonly noindex?: boolean;
  /** Set to false for pages without a canonical address (the 404 page). */
  readonly canonical?: boolean;
}
