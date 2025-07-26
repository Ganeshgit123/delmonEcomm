import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="../../assets/images/left_carou_arrow.svg">', '<img src="../../assets/images/right_carou_arrow.svg">'],
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
    nav: true
  }
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
  categoryList: any = [];
  productData: any = [];
  popupAd: any;
  adSection: any;

  constructor(public authService: AuthService, private modalService: NgbModal,) { }

  onAnimate(animationItem: AnimationItem): void {
    // console.log(animationItem);  
  }

  ngOnInit(): void {
    // this.openModal('adSection');

    this.authService.getCategory("POULTRY").subscribe(
      (res: any) => {
        this.categoryList = res.data.category;
        this.productData = res.data.productdata;
        this.popupAd = res.popupAdvertisement;
        // console.log("few",this.popupAd);
      }
    );
  }
  openModal(adSection: any) {
    this.modalService.open(adSection, { centered: true });
  }
}
