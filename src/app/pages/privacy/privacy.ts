import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  templateUrl: './privacy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Privacy {}
