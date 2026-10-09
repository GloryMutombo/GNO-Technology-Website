import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  templateUrl: './terms.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Terms {}
