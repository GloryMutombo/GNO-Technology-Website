import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CASE_STUDIES } from '../../../../content/home.content';
import { PhoneMockup } from '../../mockups/phone/phone-mockup';
import { AppWindow } from '../../mockups/app-window/app-window';

/** Home › "Selected work patterns": case-study cards. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appSelectedWorkSection]',
  standalone: true,
  imports: [AppWindow, PhoneMockup],
  templateUrl: './selected-work-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedWorkSection {
  protected readonly caseStudies = CASE_STUDIES;
}
