import { Component, Input } from '@angular/core';

@Component({
    selector: 'owl-carousel-o',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class OwlCarouselOShimComponent {
    @Input() options: any;
}
