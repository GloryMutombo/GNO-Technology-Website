import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from './sections/hero/hero-section';
import { ClientLogosSection } from './sections/client-logos/client-logos-section';
import { TrustSection } from './sections/trust/trust-section';
import { ServicesSection } from './sections/services/services-section';
import { CustomSoftwareSection } from './sections/custom-software/custom-software-section';
import { ProcessSection } from './sections/process/process-section';
import { SelectedWorkSection } from './sections/selected-work/selected-work-section';
import { SupportServicesSection } from './sections/support-services/support-services-section';
import { LocalPresenceSection } from './sections/local-presence/local-presence-section';
import { SocialProofSection } from './sections/social-proof/social-proof-section';
import { FaqSection } from './sections/faq/faq-section';
import { QuoteCtaSection } from './sections/quote-cta/quote-cta-section';

/** Home page: each section is its own component (pages/home/sections), rendered into its host <section>. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    ClientLogosSection,
    TrustSection,
    ServicesSection,
    CustomSoftwareSection,
    ProcessSection,
    SelectedWorkSection,
    SupportServicesSection,
    LocalPresenceSection,
    SocialProofSection,
    FaqSection,
    QuoteCtaSection,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
