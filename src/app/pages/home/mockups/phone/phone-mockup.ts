import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Phone visual for the field-service case study (decorative). */
@Component({
  selector: 'div[appPhoneMockup]',
  standalone: true,
  imports: [],
  templateUrl: './phone-mockup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMockup {}
