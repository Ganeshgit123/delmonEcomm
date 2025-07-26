import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home-f',
  templateUrl: './home-f.component.html',
  styleUrls: ['./home-f.component.css']
})
export class HomeFComponent {

  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="assets/images/left_carou_arrow.svg">', '<img src="assets/images/right_carou_arrow.svg">'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      576: {
        items: 2
      },
      767: {
        items: 3
      },
      992: {
        items: 3
      },
      1140: {
        items: 3
      }

    },
    nav: true,
    rtl: true
  }

  optionsone: AnimationOptions = {
    path: '../../../assets/images/feeding/27169-apple-download.json'
  };


  optionstwo: AnimationOptions = {
    path: '../../../assets/images/feeding/27173-googleplay-button.json'
  };

  categoryListF: any;
  productData: any = [];
  selectedFeedId : any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.authService.getCategory("FEEDING").subscribe(
      (res: any) => {
        this.categoryListF = res.data.category;
        this.productData = res.data.productdata;
        // console.log("few",this.categoryListF)
      }
    );

    //this.getProduct(0);


  }

  getProduct(id: any) {
    this.authService.getProduct(id).subscribe(
      (res: any) => {
        this.productData = res.data;
        // console.log("Feed_products", this.productData);
      });

  }

  onAnimate(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  GetItem(item : any)
  {
    // console.log(item)
    this.selectedFeedId = item.id;
    this.router.navigate([`/feed/${item.id}`])
  }
}
