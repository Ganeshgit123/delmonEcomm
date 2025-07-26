import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-booking-complete',
  templateUrl: './booking-complete.component.html',
  styleUrls: ['./booking-complete.component.css']
})
export class BookingCompleteComponent {


  options: AnimationOptions = {
    path: '../../assets/images/Animations/6761-check-box-3.json'
  };

  constructor() { }

  ngOnInit(): void { }

  onAnimate(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

}
