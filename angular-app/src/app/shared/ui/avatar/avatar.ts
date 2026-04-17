import { Component, effect, input, signal } from '@angular/core';

@Component({
    selector: 'ui-avatar',
    standalone: true,
    templateUrl: './avatar.html',
    host: {
        class: 'block w-8 h-8 relative shrink-0'
    }
})
export class Avatar {
    src = input<string | null | undefined>();

    isLoading = signal(true);
    isError = signal(false);

    constructor() {
        effect(() => {
            if (this.src()) {
                this.isLoading.set(true);
                this.isError.set(false);
            } else {
                setTimeout(() => {
                    this.isLoading.set(false);
                }, 150);
            }
        });
    }

    onLoad() {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 150);
    }

    onError() {
        setTimeout(() => {
            this.isLoading.set(false);
            this.isError.set(true);
        }, 150);
    }
}