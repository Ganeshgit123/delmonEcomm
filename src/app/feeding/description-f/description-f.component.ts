import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-description-f',
  templateUrl: './description-f.component.html',
  styleUrls: ['./description-f.component.css']
})
export class DescriptionFComponent {
  loggedUser: any;
  categoryId: any;
  productDetails: any;
  productImg: any;
  productName: any;
  productDescription: any;
  sendCartData: any;
  productId: any;
  productweight: any;
  productnoOfPieces: any;
  productNserves: any;
  productdescription: any;
  isStock: any;
  relatedProduct: any;
  relatedProductFilter: any;
  productprice: any;
  recipiesList: any;
  selectedId: any = 0;
  soldType: any;
  cartonActive: any;
  piecesActive: any;
  isFavorites: any;
  sendFavData: any;
  favoriteData = [];
  favLength: any;
  activePiece: any;
  activeCarton: any;
  activePack: any;
  getBasket: any;
  basketData: any;
  normalPrice: any;
  productNameAr: any;
  productdescriptionAr: any;
  dir: any;

  options: AnimationOptions = {
    path: '../../../assets/images/Animations/67978-green-tick.json'
  };

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    window.scroll(0, 0);
    this.loggedUser = sessionStorage.getItem('isLogged');
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });

    this.authService.getProductDetails(this.categoryId).subscribe((res: any) => {
      this.productDetails = res.data;

      this.productImg = res.data.image[0];
      this.productName = res.data.name;
      this.productNameAr = res.data?.arProductName;
      this.productweight = res.data.weight;
      this.productnoOfPieces = res.data.noOfPieces;
      this.productNserves = res.data.serves;
      this.productdescription = res.data.description;
      this.productdescriptionAr = res.data?.arDescription;
      // this.productprice = res.data.price;
      this.relatedProduct = res.data.relatedProduct;
      this.recipiesList = res.data.recipiesList;
      this.cartonActive = res.data.cartonActive;
      this.piecesActive = res.data.piecesActive;
      this.isFavorites = res.data.isFavorites;

      if ((res.data.cartonActive == 1 && res.data.piecesActive == 1) || res.data.piecesActive == 1 && res.data.cartonActive == 0) {
        this.soldType = 1
        this.updateSoldtype(1)
        this.activePiece = true;
        this.activeCarton = false;
        this.relatedProductFilter = this.relatedProduct.filter((element: any) => {
          return element.soldType == this.soldType;
        })
        this.productprice = this.relatedProductFilter[0].price
        this.selectedId = this.relatedProductFilter[0].id
        this.isStock = this.relatedProductFilter[0].stock;
      } else if (res.data.piecesActive == 0 && res.data.cartonActive == 1) {
        this.soldType = 2
        this.updateSoldtype(2)
        this.relatedProductFilter = this.relatedProduct.filter((element: any) => {
          return element.soldType == this.soldType;
        })
        if (this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0].offerPrice && this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0].price) {
          this.normalPrice = this.relatedProductFilter[0].normalPrice
        }
        this.productprice = this.relatedProductFilter[0].price
        this.selectedId = this.relatedProductFilter[0].id
        this.isStock = this.relatedProductFilter[0].stock;
      }
    })

    if (this.loggedUser == 'true') {
      this.authService.getFavorites().subscribe(
        (res: any) => {
          this.favoriteData = res.data.filter((element: any) => {
            return element.id == this.categoryId;
          })
          this.favLength = this.favoriteData.length;
        })
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
    if (this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0].offerPrice && this.relatedProductFilter[0].normalPrice > this.relatedProductFilter[0].price) {
      this.normalPrice = this.relatedProductFilter[0].normalPrice
    }
    this.productprice = this.relatedProductFilter[0].price
    this.activePack = this.relatedProductFilter[0].id
    // console.log("filter", this.relatedProductFilter);
    // console.log("data", this.relatedProduct);
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
      this.router.navigate([`/phone`])
    }
  }

  addFav() {
    if (this.loggedUser == 'true') {
      this.isFavorites = 1;
      this.sendFavData = { 'productId': this.categoryId, 'isFavorites': 1 };
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
      sessionStorage.setItem("cart", this.categoryId);
    }
  }

  removeFav() {
    if (this.loggedUser == 'true') {
      this.isFavorites = 0;
      this.sendFavData = { 'productId': this.categoryId, 'isFavorites': 0 };
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
      sessionStorage.setItem("cart", this.categoryId);
    }
  }


  getWeightId(id: any, price: any, stockValue: any, normalPrice: any, offerPrice: any) {
    this.activePack = id;
    this.selectedId = id;
    if (normalPrice > offerPrice && normalPrice > price) {
      this.normalPrice = normalPrice;
    }
    this.productprice = price;
    this.isStock = stockValue;
  }

}
