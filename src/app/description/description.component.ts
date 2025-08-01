import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
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
  loggedUser: any;
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

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private modalService: NgbModal, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    window.scroll(0, 0);
    this.loggedUser = sessionStorage.getItem('isLogged');
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
      // this.productprice = res.data.price;
      this.relatedProduct = res.data?.relatedProduct.sort((a: any, b: any) => a.id - b.id);

      this.recipiesList = res.data?.recipiesList;
      this.cartonActive = res.data?.cartonActive;
      this.piecesActive = res.data?.piecesActive;
      this.isFavorites = res.data?.isFavorites;

      if ((res.data.cartonActive == 1 && res.data.piecesActive == 1) || res.data.piecesActive == 1 && res.data.cartonActive == 0) {
        this.soldType = 1
        this.updateSoldtype(1)
        this.activePiece = true;
        this.activeCarton = false;

        this.relatedProductFilter = this.relatedProduct.filter((element: any) => {
          return element.soldType == this.soldType;
        })
        // console.log("nromal", this.relatedProductFilter[0].normalPrice)
        // console.log("price", this.relatedProductFilter[0].price)
        // console.log("offerPrice", this.relatedProductFilter[0].offerPrice)
        if (!(this.relatedProductFilter[0].offerPrice == 0 || this.relatedProductFilter[0].offerPrice == null)) {
          if (this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0]?.offerPrice && this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0]?.price) {
            this.normalPrice = this.relatedProductFilter[0].normalPrice
          }
        }
        if (this.relatedProductFilter[0].price == 0) {
          this.productprice = this.relatedProductFilter[0].normalPrice
        } else {
          this.productprice = this.relatedProductFilter[0].price
        }
        this.selectedId = this.relatedProductFilter[0].id
        this.isStock = this.relatedProductFilter[0].stock;
      } else if (res.data.piecesActive == 0 && res.data.cartonActive == 1) {
        this.soldType = 2
        this.updateSoldtype(2)
        this.relatedProductFilter = this.relatedProduct.filter((element: any) => {
          return element.soldType == this.soldType;
        })
        if (!(this.relatedProductFilter[0].offerPrice == 0 || this.relatedProductFilter[0].offerPrice == null)) {
          if (this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0]?.offerPrice && this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0]?.price) {
            this.normalPrice = this.relatedProductFilter[0].normalPrice
          }
        }
        if (this.relatedProductFilter[0].price == 0) {
          this.productprice = this.relatedProductFilter[0].normalPrice
        } else {
          this.productprice = this.relatedProductFilter[0].price
        }
        this.selectedId = this.relatedProductFilter[0].id;
        this.isStock = this.relatedProductFilter[0].stock;
      }
    })

    if (this.loggedUser == 'true') {
      this.authService.viewBasket().subscribe((res: any) => {
        this.getBasket = res.data;
      })
      this.authService.getFavorites().subscribe(
        (res: any) => {
          this.favoriteData = res.data.filter((element: any) => {
            return element.id == this.productId;
          })
          this.favLength = this.favoriteData.length;
        })
    }
  }

  sendRecipiesListId(id: any, recipies: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        recipiesData: recipies
        // frompage: "this.backgroundColor",
        // previouspage: "this.previousPage",
        // prevPage: "his.prevPage",
      }
    }
    this.router.navigate([`/ingredients/${id}`], navigationExtras);
  }

  getWeightId(id: any, price: any, stockValue: any, normalPrice: any, offerPrice: any) {
    this.activePack = id;
    this.selectedId = id;
    if (!(offerPrice == 0 || offerPrice == null))
      if (normalPrice > offerPrice && normalPrice > price) {
        this.normalPrice = normalPrice;
      }
    if (price == 0) {
      this.productprice = normalPrice
    } else {
      this.productprice = price
    }
    this.isStock = stockValue;
    // console.log("fe",stockValue)
  }

  sendCartValue() {
    if (this.loggedUser == 'true') {
      this.sendCartData = { 'productId': this.selectedId, 'price': this.productprice };
      // console.log("add_To_cart", this.sendCartData);
      this.authService.addtoCart(this.sendCartData).subscribe((res: any) => {
        if (res.error == false) {
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
    if (type == 1) {
      this.activePiece = true;
      this.activeCarton = false;
    } else if (type == 2) {
      this.activeCarton = true;
      this.activePiece = false;
    }
    this.soldType = type;
    // console.log("sold type id", this.soldType);
    this.relatedProductFilter = this.relatedProduct.filter((element: any) => {
      return element.soldType == this.soldType;
    })
    if (!(this.relatedProductFilter[0].offerPrice == 0 || this.relatedProductFilter[0].offerPrice == null)) {
      if (this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0]?.offerPrice && this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0]?.price) {
        this.normalPrice = this.relatedProductFilter[0].normalPrice
      }
    }
    if (this.relatedProductFilter[0].price == 0) {
      this.productprice = this.relatedProductFilter[0].normalPrice
    } else {
      this.productprice = this.relatedProductFilter[0].price
    }
    this.selectedId = this.relatedProductFilter[0].id;
    this.activePack = this.relatedProductFilter[0].id
    this.isStock = this.relatedProductFilter[0].stock;
    // console.log("filter", this.relatedProductFilter);
    // console.log("data", this.relatedProduct);
  }

  openVerticallyCentered(content: any) {
    if (this.loggedUser == 'true') {
      this.modalService.open(content, { centered: true });
      this.authService.viewBasket().subscribe((res: any) => {
        this.getBasket = res.data;
      })
    } else {
      sessionStorage.setItem("cart", this.productId);
      this.router.navigate([`/phone`]);
    }
  }

  openNewBasket(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

  sendBasketValue = new FormGroup({
    name: new FormControl("", Validators.required),
  })

  sendBasketName() {
    this.authService.createBasket(this.sendBasketValue.value).subscribe((res: any) => {
      // this.modalService.dismissAll();
    })
  }

  sendBasketdata(id: any) {
    this.basketData = { 'basketId': id, 'productId': this.selectedId, 'price': this.productprice };
    this.authService.addProductBasket(this.basketData).subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success(res.message);
        // this.modalService.dismissAll();
      }
      else {
        this.toastr.error('Kindly Login to Your Account')
      }
    })
  }

  addFav() {
    if (this.loggedUser == 'true') {
      this.isFavorites = 1;
      this.sendFavData = { 'productId': this.productId, 'isFavorites': 1 };
      this.authService.setFavorites(this.sendFavData).subscribe((res: any) => {
        if (res.error == false) {
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
    if (this.loggedUser == 'true') {
      this.isFavorites = 0;
      this.sendFavData = { 'productId': this.productId, 'isFavorites': 0 };
      this.authService.setFavorites(this.sendFavData).subscribe((res: any) => {
        if (res.error == false) {
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
