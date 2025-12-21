import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
    selector: 'ng-lottie',
    template: '<div #container style="width:100%;height:100%;display:block"></div>'
})
export class NgLottieShimComponent implements OnInit, OnDestroy {
    @Input() options: { path?: string; animationData?: any; loop?: boolean; autoplay?: boolean } = {};
    @Output() animationCreated = new EventEmitter<AnimationItem>();
    @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

    private anim?: AnimationItem;

    ngOnInit(): void {
        this.anim = lottie.loadAnimation({
            container: this.container.nativeElement,
            renderer: 'svg',
            loop: this.options.loop ?? true,
            autoplay: this.options.autoplay ?? true,
            path: this.options.path,
            animationData: this.options.animationData
        });
        this.animationCreated.emit(this.anim);
    }

    ngOnDestroy(): void {
        this.anim?.destroy();
    }
}
