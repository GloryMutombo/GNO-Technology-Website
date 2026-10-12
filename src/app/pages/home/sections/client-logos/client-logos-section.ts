import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Home › "Our clients" logo marquee (CSS-only animation). Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appClientLogosSection]',
  standalone: true,
  imports: [],
  templateUrl: './client-logos-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLogosSection {}
