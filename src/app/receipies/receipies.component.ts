import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-receipies',
  templateUrl: './receipies.component.html',
  styleUrls: ['./receipies.component.css']
})
export class ReceipiesComponent {

  categoryList:any;
  recipiesData:any;
  activeStyle:any;
  catLength:any;

  options: AnimationOptions = {    
    path: 'assets/images/Animations/Chicken-Roll.json'  
  };  

  constructor( private auth:AuthService, private router:Router){}

  ngOnInit():void{

    this.auth.getCategories().subscribe((res:any)=>{
      this.categoryList = res.data;
    })

    this.sendCatId(0);
    this.activeStyle = 0;

  }

  sendCatId(id:any){
    this.activeStyle = id;
    this.auth.getRecipies(id).subscribe((res:any)=>{
      this.recipiesData = res.data;
      this.catLength = this.recipiesData.length;
    })
    
  }

  sendRecipiesId(id:any,recipies:any){
    let navigationExtras: NavigationExtras = {
      state: {
        recipiesData:recipies
      }
    }
    this.router.navigate([`/ingredients/${id}`],navigationExtras);
  }


}
