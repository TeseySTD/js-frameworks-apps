import { Component, input } from '@angular/core';
import { LucideLoader2 } from '@lucide/angular';

@Component({
  selector: 'ui-loader',
  imports: [LucideLoader2],
  templateUrl: './loader.html',
})
export class Loader {
  titleText = input<string>('Fetching Content');
  subtitleText = input<string>('Please wait while we sync with the dev ecosystem');
}
