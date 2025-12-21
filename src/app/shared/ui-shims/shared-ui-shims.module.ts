import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlCarouselOShimComponent } from './owl-carousel-o-shim.component';
import { NgLottieShimComponent } from './ng-lottie-shim.component';

@NgModule({
    declarations: [OwlCarouselOShimComponent, NgLottieShimComponent],
    imports: [CommonModule],
    exports: [OwlCarouselOShimComponent, NgLottieShimComponent]
})
export class SharedUiShimsModule { }
