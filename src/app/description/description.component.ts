import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  standalone: false
})
export class DescriptionComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [' <img src="assets/images/Icon-feather-arrow-right.svg">', '<img src="assets/images/Icon-feather-arrow-left.svg">'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1140: {
        items: 4
      }

    },
    nav: true,
    rtl: true
  }

  productId: any;
  productDetails: any;
  weightId: any;
  productImg: any;
  productName: any;
  productweight: any;
  productnoOfPieces: any;
  productNserves: any;
  productdescription: any;
  isStock: any;
  relatedProduct: any;
  relatedProductFilter: any;
  productprice: any;
  recipiesList: any;
  sendCartData: any;
  selectedId: any = 0;
  soldType: any;
  cartonActive: any;
  piecesActive: any;
  closeResult = '';
  activePiece: any;
  activeCarton: any;
  activePack: any;
  getBasket: any;
  basketData: any;
  isLoggedIn = false;
  isFavorites: any;
  sendFavData: any;
  favoriteData = [];
  favLength: any;
  normalPrice: any;
  dir: any;
  productNameAr: any;
  productdescriptionAr: any;

  options: AnimationOptions = {
    path: '../../../assets/images/Animations/67978-green-tick.json'
  };

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private dialog: MatDialog, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    window.scroll(0, 0);
    this.isLoggedIn = sessionStorage.getItem('isLogged') === 'true';
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });

    this.authService.getProductDetails(this.productId).subscribe((res: any) => {
      this.productDetails = res.data;

      this.productImg = res.data?.image[0];
      this.productName = res.data?.enProductName;
      this.productNameAr = res.data?.arProductName;
      this.productweight = res.data?.weight;
      this.productnoOfPieces = res.data?.noOfPieces;
      this.productNserves = res.data?.serves;
      this.productdescription = res.data?.description;
      this.productdescriptionAr = res.data?.arDescription;
      this.relatedProduct = res.data?.relatedProduct?.sort((a: any, b: any) => a.id - b.id);

      this.recipiesList = res.data?.recipiesList;
      this.cartonActive = res.data?.cartonActive;
      this.piecesActive = res.data?.piecesActive;
      this.isFavorites = res.data?.isFavorites;

      // If piecesActive is 1, default to Pieces; else if only cartonActive is 1, default to Carton
      if (res.data?.piecesActive === 1) {
        this.soldType = 1;
        this.updateSoldtype(1);
        this.activePiece = true;
        this.activeCarton = false;

        this.relatedProductFilter = this.relatedProduct.filter((element: any) => {
          return element.soldType === this.soldType;
        });
        const firstProduct = this.relatedProductFilter[0];
        this.setPrices(firstProduct);
        this.selectedId = firstProduct?.id;
        this.isStock = firstProduct?.stock;
      } else if (res.data?.cartonActive === 1) {
        this.soldType = 2;
        this.updateSoldtype(2);
        this.relatedProductFilter = this.relatedProduct?.filter((element: any) => {
          return element.soldType === this.soldType;
        });
        if (this.relatedProductFilter?.length) {
          const firstProduct = this.relatedProductFilter[0];
          this.setPrices(firstProduct);
          this.selectedId = firstProduct?.id;
          this.isStock = firstProduct?.stock;
        }
      }
    })

    if (this.isLoggedIn) {
      this.authService.viewBasket().subscribe((res: any) => {
        this.getBasket = res.data;
      })
      this.authService.getFavorites().subscribe(
        (res: any) => {
          this.favoriteData = res.data.filter((element: any) => {
            return element.id === this.productId;
          })
          this.favLength = this.favoriteData.length;
        })
    }
  }

  private setPrices(product: any) {
    const offer = Number(product?.offerPrice);
    const normal = Number(product?.normalPrice);

    if (offer > 0 && offer < normal) {
      this.productprice = offer;
      this.normalPrice = normal;
    } else if (normal > 0) {
      this.productprice = normal;
      this.normalPrice = null; // No strike out
    } else {
      this.productprice = null;
      this.normalPrice = null;
    }
  }

  sendRecipiesListId(id: any, recipies: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        recipiesData: recipies
      }
    }
    this.router.navigate([`/ingredients/${id}`], navigationExtras);
  }

  getWeightId(id: any, stockValue: any, normalPrice: any, offerPrice: any) {
    this.activePack = id;
    this.selectedId = id;
    this.setPrices({ offerPrice, normalPrice });
    this.isStock = stockValue;
  }

  sendCartValue() {
    if (this.isLoggedIn) {
      this.sendCartData = { 'productId': this.selectedId, 'price': this.productprice };
      this.authService.addtoCart(this.sendCartData).subscribe((res: any) => {
        if (res.error === false) {
          this.toastr.success('Successfully', res.message);
        }
        else {
          this.toastr.error(res.message);
        }
      })
    }
    else {
      sessionStorage.setItem("cart", this.productId);
      this.router.navigate([`/phone`]);
    }
  }

  updateSoldtype(type: any) {
    if (type === 1) {
      this.activePiece = true;
      this.activeCarton = false;
    } else if (type === 2) {
      this.activeCarton = true;
      this.activePiece = false;
    }
    this.soldType = type;
    this.relatedProductFilter = this.relatedProduct?.filter((element: any) => {
      return element.soldType === this.soldType;
    })
    if (this.relatedProductFilter?.length) {
      const firstProduct = this.relatedProductFilter[0];
      this.setPrices(firstProduct);
      this.selectedId = firstProduct?.id;
      this.activePack = firstProduct?.id;
      this.isStock = firstProduct?.stock;
    }
  }

  openVerticallyCentered(content: any) {
    if (this.isLoggedIn) {
      this.dialog.open(content, {});
      this.authService.viewBasket().subscribe((res: any) => {
        this.getBasket = res.data;
      })
    } else {
      sessionStorage.setItem("cart", this.productId);
      this.router.navigate([`/phone`]);
    }
  }

  openNewBasket(content1: any) {
    this.dialog.open(content1, {});
  }

  sendBasketValue = new FormGroup({
    name: new FormControl("", Validators.required),
  })

  sendBasketName() {
    this.authService.createBasket(this.sendBasketValue.value).subscribe((res: any) => {
    })
  }

  sendBasketdata(id: any) {
    this.basketData = { 'basketId': id, 'productId': this.selectedId, 'price': this.productprice };
    this.authService.addProductBasket(this.basketData).subscribe((res: any) => {
      if (res.error === false) {
        this.toastr.success(res.message);
      }
      else {
        this.toastr.error('Kindly Login to Your Account')
      }
    })
  }

  addFav() {
    if (this.isLoggedIn) {
      this.isFavorites = 1;
      this.sendFavData = { 'productId': this.productId, 'isFavorites': 1 };
      this.authService.setFavorites(this.sendFavData).subscribe((res: any) => {
        if (res.error === false) {
          this.toastr.success(res.message);
          this.ngOnInit();
        }
        else {
          this.toastr.error(res.message);
        }
      })
    } else {
      this.router.navigate([`/phone`]);
      sessionStorage.setItem("cart", this.productId);
    }
  }

  removeFav() {
    if (this.isLoggedIn) {
      this.isFavorites = 0;
      this.sendFavData = { 'productId': this.productId, 'isFavorites': 0 };
      this.authService.setFavorites(this.sendFavData).subscribe((res: any) => {
        if (res.error === false) {
          this.toastr.success(res.message);
          this.ngOnInit();
        } else {
          this.toastr.error(res.message);
        }
      })
    } else {
      this.router.navigate([`/phone`]);
      sessionStorage.setItem("cart", this.productId);
    }
  }
}
