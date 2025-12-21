import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-basket-list',
    templateUrl: './admin-basket.component.html',
    styleUrls: ['./admin-basket.component.css'],
    standalone: false
})
export class AdminBasketComponent {

  productId:any;
  productData:any;
  productName:any;
  productAmount:any;
  productWeight:any;
  basketProducts:any[] = [];

  options: AnimationOptions = {    
    path: 'assets/images/Animations/Chicken-Roll.json'  
  };  

  constructor(private authService: AuthService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      this.productId = params['id']; 
    });

    this.authService.getBasketProductDetail(this.productId).subscribe((res:any) => {
        this.productData = res.data;
        this.basketProducts = res.productList;
        this.productName = this.productData.enProductName;
        this.productAmount = this.productData.price;
        this.productWeight = this.productData.weight;
    })
  }

  sendBasketToCart(){
    this.authService.adminBasketToCart(this.productId).subscribe((res:any)=>{
      if (res.error == false) {
        this.router.navigate([`/cart`]);
        this.toastr.success('Successfully', res.message);
      }
      else {
        this.toastr.error('Kindly Login to Your Account')
      }
    })
  }
}