import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FAQS } from '../content/home.content';
import { SITE_CONFIG } from './site.config';

interface JsonLdEntity {
  readonly [key: string]: unknown;
}

const BREADCRUMB_NAMES: Readonly<Record<string, string>> = {
  '/about': 'About GNOD',
  '/our-process': 'Our process',
  '/contact': 'Contact',
  '/privacy': 'Privacy policy',
  '/terms': 'Terms and conditions',
};

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  update(path: string): void {
    this.document.head
      .querySelectorAll<HTMLScriptElement>('script[data-gnod-jsonld]')
      .forEach((element) => this.renderer.removeChild(this.document.head, element));

    this.add(this.businessSchema());

    if (path === '/') {
      this.add({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
      return;
    }

    const label = BREADCRUMB_NAMES[path];
    if (label) {
      this.add({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.origin },
          {
            '@type': 'ListItem',
            position: 2,
            name: label,
            item: `${SITE_CONFIG.origin}${path}`,
          },
        ],
      });
    }
  }

  private businessSchema(): JsonLdEntity {
    return {
      '@context': 'https://schema.org',
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${SITE_CONFIG.origin}/#business`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.origin,
      telephone: '+27 12 663 3699',
      email: SITE_CONFIG.email,
      image: `${SITE_CONFIG.origin}/images/gnod-logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '59 Blinkblaar',
        addressLocality: 'Zwartkop, Centurion',
        postalCode: '0157',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      areaServed: ['Centurion', 'Pretoria', 'Johannesburg', 'South Africa'],
    };
  }

  private add(entity: JsonLdEntity): void {
    const script = this.renderer.createElement('script') as HTMLScriptElement;
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setAttribute(script, 'data-gnod-jsonld', 'true');
    const content = this.renderer.createText(JSON.stringify(entity).replace(/</g, '\\u003c'));
    this.renderer.appendChild(script, content);
    this.renderer.appendChild(this.document.head, script);
  }
}
