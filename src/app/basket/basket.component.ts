import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  basketId: any;
  basketData: any;
  getBasketName: any;
  cartData: any;
  basketDataLength:any;

  options: AnimationOptions = {    
    path: 'assets/images/Animations/Chicken-Roll.json'  
  };  


  constructor(private authService: AuthService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router,private modalService: NgbModal) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.getBasketName = this.router.getCurrentNavigation()?.extras.state;
      // console.log('ssss',this.recipiesDetails);
    }
  }

  openVerticallyCentered(content: any) {

    this.modalService.open(content, { centered: true });
}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.basketId = params['id'];
    });

    this.authService.viewProductBasket(this.basketId).subscribe((res: any) => {
      // console.log("SUBASk", res.data);
      this.basketData = res.data;
      this.basketDataLength = this.basketData.length;
      
    })

  }



  sendBasketValue() {


    this.authService.basketToCart(this.basketId).subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success('Successfully', res.message);
      }
      else {
        this.toastr.error('Kindly Login to Your Account')
      }
    })
  }
    
  //   for (let basket of this.basketData) {
  //     let i = basket.productId;
  //     console.log(i);
     
  //   }
    
  // }

  
//   sendBasketValue() {

//     console.log(this.basketData);

//     for (let basket of this.basketData) {
//       let i = basket.productId;
//       this.cartData = { 'productId': basket.productId, 'price': basket.price };
//       console.log("add_To_cart", this.cartData);
//       this.authService.addtoCart(this.cartData).subscribe((res: any) => {
//         if (res.error == false) {
//           this.toastr.success('Successfully', res.message);
//         }
//         else {
//           this.toastr.error('Kindly Login to Your Account')
//         }
//       })
//     }
//  }


  removeItem(id:any){
    
    this.authService.removeProductBasket(id).subscribe(
      (res:any) => {
        if(res.error == false){
          this.toastr.success(res.message);
          this.ngOnInit();
         }
         else {
          this.toastr.error(res.message);
         }
      }
    )
  }

  removeBasket(){
    console.log(this.basketId);
    this.authService.removeBasket(this.basketId).subscribe(
      (res:any) =>{
       if(res.error == false){
        this.toastr.success('Successfully', res.message);
        this.router.navigate([`/basket-list`]);
        this.modalService.dismissAll();
       }
        
      }
    )
  }


}
