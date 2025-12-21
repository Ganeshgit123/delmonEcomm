import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-ingredients',
    templateUrl: './ingredients.component.html',
    styleUrls: ['./ingredients.component.css'],
    standalone: false
})
export class IngredientsComponent {

  recipiesListId :any;
  recipiesDetails:any;

  constructor(private authService:AuthService, private route:ActivatedRoute, private router:Router){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.recipiesDetails = this.router.getCurrentNavigation()?.extras.state;
      // console.log('ssss',this.recipiesDetails);
    }
  }

  ngOnInit(): void{
    window.scroll(0,0);
    this.route.params.subscribe((params) => {
      this.recipiesListId = params['id'];
      // console.log("get-route",this.recipiesListId);
    });

  }

}
