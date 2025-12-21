import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-fresh',
    templateUrl: './fresh.component.html',
    styleUrls: ['./fresh.component.css'],
    standalone: false
})
export class FreshComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  categoryId: any;
  categoryList: any;
  productList: any;
  sendCartData: any;
  basketListValue: any;
  basketListData: any;
  basketList: any;
  productId: any;
  basketData: any;
  activeStyle: any;
  prodLength: any;
  dir: any;

  options: AnimationOptions = {
    path: 'assets/images/Animations/Chicken-Roll.json'
  };


  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    window.scroll(0, 0);
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      if (this.categoryId == undefined) {
        this.getProduts(0);
        this.activeStyle = 0;
      } else {
        this.getProduts(this.categoryId);
      }
    });

    this.authService.getCategories().subscribe(
      (res: any) => {
        this.categoryList = res.data;
      });

    // this.authService.viewBasket().subscribe((res:any)=>{
    //   this.basketList = res.data;

    // })

  }

  getProduts(id: any) {
    this.activeStyle = id;
    this.authService.getProduct(id).subscribe(
      (res: any) => {
        this.productList = res.data;
        this.prodLength = this.productList.length;
        // console.log("sketch",this.productList.length);
      });
  }

  sendCategoryId(id: any) {
    this.router.navigate([`/description/${id}`])
  }

  sendCartValue(id: any, price: any) {
    this.sendCartData = { 'productId': id, 'price': price, };
    this.authService.addtoCart(this.sendCartData).subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success('Successfully', res.message);
      }
      else {
        this.toastr.error('Kindly Login to Your Account')
      }
    })
  }

  sendBasketValue() {
    this.basketListData = { 'name': this.basketListValue };
    this.authService.createBasket(this.basketListData).subscribe((res: any) => {
      this.toastr.success('Successfully', res.message);
      this.ngOnInit();
    })
  }

  getProductId(id: any) {
    this.productId = id;
  }


  addProductBasket(id: any) {
    this.basketData = { "productId": id, "basketId": this.productId };
    this.authService.addProductBasket(this.basketData).subscribe((res: any) => {
      // console.log(res.message);
    })
  }
}
