import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { iconPath } from './icons';

/**
 * Lucide icon (`<lucide-icon name="arrow-right" [size]="16" [strokeWidth]="1.5" />`).
 *
 * Draws the icon data from lucide-angular as one static <svg><path/></svg> (all shapes merged
 * into a single path; identical for these stroke-only icons). Unlike lucide-angular's own
 * component, which deletes and rebuilds its <svg> at runtime, the prerendered SVG is simply
 * reused during hydration.
 */
@Component({
  selector: 'lucide-icon',
  standalone: true,
  templateUrl: './icon.html',
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(24, { transform: numberAttribute });
  readonly strokeWidth = input(2, { transform: numberAttribute });
  /** Classes on the host are also applied to the <svg>, as lucide-angular does. */
  readonly hostClass = input('', { alias: 'class' });

  protected readonly d = computed(() => iconPath(this.name()));

  protected readonly svgClass = computed(() =>
    `lucide lucide-${this.name()} ${this.hostClass()}`.trim(),
  );
}
