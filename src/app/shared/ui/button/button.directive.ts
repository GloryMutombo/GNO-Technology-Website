import { Directive, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline' | 'outline-dark' | 'white';

@Directive({
  selector: 'a[appButton], button[appButton]',
  standalone: true,
  host: {
    class: 'gnod-button',
    '[class.gnod-button--primary]': 'variant() === "primary"',
    '[class.gnod-button--outline]': 'variant() === "outline"',
    '[class.gnod-button--outline-dark]': 'variant() === "outline-dark"',
    '[class.gnod-button--white]': 'variant() === "white"',
  },
})
export class ButtonDirective {
  readonly variant = input<ButtonVariant>('primary', { alias: 'appButton' });
}
