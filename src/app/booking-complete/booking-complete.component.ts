import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-booking-complete',
    templateUrl: './booking-complete.component.html',
    styleUrls: ['./booking-complete.component.css'],
    standalone: false
})
export class BookingCompleteComponent {
  message: string | null = null;

  options: AnimationOptions = {
    path: 'assets/images/Animations/6761-check-box-3.json'
  };

  options1: AnimationOptions = {
    path: 'assets/images/Animations/cancel.json'
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.message = nav?.extras.state?.['message'] || null;
  }

  ngOnInit(): void { }

}
