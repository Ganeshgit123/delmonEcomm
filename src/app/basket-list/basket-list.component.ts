import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent {

  getBasket: any;
  activeStyle:any;
  activeStyleOne :any;
  activeStyleTwo:any;
  basketLength:any;
  productList:any;
  adminBasketLength: any;

  options: AnimationOptions = {    
    path: 'assets/images/Animations/Chicken-Roll.json'  
  };  

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeStyle = 1;

    this.authService.viewBasket().subscribe((res: any) => {
      this.getBasket = res.data;
      // console.log("Basket DAta", res.data);
      this.basketLength = this.getBasket.length;
      // console.log("basketlength :", this.basketLength);
    })

    this.authService.getAdminBasket().subscribe((res:any) => {
      // console.log("Admin Basket",res.data); 
      this.productList = res.data;
      this.adminBasketLength = this.productList.length;
    })

  }

  checkBasket(id:any){
    this.activeStyle = id;
    // console.log(this.activeStyle);
    
    
  }

  onAnimate(animationItem: AnimationItem): void {    
    // console.log(animationItem);  
  }


  sendBasketId(id: any, name: any) {

    // console.log("BAsket ID", id);
    

    let navigationExtras: NavigationExtras = {
      state: {
        basketName: name
      }
    }

    this.router.navigate([`/basket/${id}`], navigationExtras);
  }

  adminBasket(id:any){
    this.activeStyle = id;
    // console.log(this.activeStyle);
  }

  sendAdminId(id:any){
    // console.log("Admin ID",id);
    this.router.navigate([`/admin-basket/${id}`]);
  }

}
