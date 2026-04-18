import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  templateUrl: './avatar.html',
  host: {
    class: 'block w-8 h-8 relative shrink-0',
  },
})
export class Avatar {
  src = input<string | null | undefined>();

  isLoading = signal(true);
  isError = signal(false);

  constructor() {
    effect(() => {
      const currentSrc = this.src();

      if (!currentSrc) {
        this.isLoading.set(false);
        return;
      }

      // Create a detached Image object to check the browser cache
      const img = new Image();
      img.src = currentSrc;

      if (img.complete) {
        this.isLoading.set(false);

        // If naturalWidth is 0, the cached image is actually broken
        this.isError.set(img.naturalWidth === 0);
      } else {
        this.isLoading.set(true);
        this.isError.set(false);
      }
    });
  }

  onLoad() {
    this.isLoading.set(false);
  }

  onError() {
    this.isLoading.set(false);
    this.isError.set(true);
  }
}
