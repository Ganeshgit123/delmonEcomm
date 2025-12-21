import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
    selector: 'app-booking-complete-f',
    templateUrl: './booking-complete-f.component.html',
    styleUrls: ['./booking-complete-f.component.css'],
    standalone: false
})
export class BookingCompleteFComponent {
  
  options: AnimationOptions = {
    path: '../../assets/images/Animations/6761-check-box-3.json'
  };

  constructor() { }

  ngOnInit(): void { }

  onAnimate(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

}
