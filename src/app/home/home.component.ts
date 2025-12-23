import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
// OwlOptions shim type is unused after replacing with Swiper
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  @ViewChildren('prodScroller') prodScrollers!: QueryList<ElementRef<HTMLElement>>;
  homeOptions: any = {
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
  productOptions: any = {
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
  dialogRef: MatDialogRef<any> | null = null;

  constructor(public authService: AuthService, private dialog: MatDialog,) { }

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
    this.dialogRef = this.dialog.open(adSection, { panelClass: 'mat-dialog-no-padding' });
  }
  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    } else {
      this.dialog.closeAll();
    }
  }

  scrollProducts(sectionIndex: number, direction: number): void {
    const scroller = this.prodScrollers?.toArray?.()[sectionIndex];
    if (!scroller) return;
    const el = scroller.nativeElement;
    const isRtl = getComputedStyle(el).direction === 'rtl';
    const effectiveDir = isRtl ? -direction : direction;
    const delta = Math.round(el.clientWidth * 0.9) * effectiveDir;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }
}
