import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-looking',
    templateUrl: './looking.component.html',
    styleUrls: ['./looking.component.css'],
    standalone: false
})
export class LookingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  categSelect(val:any){
    if(val == 'poultry'){
      localStorage.setItem('flow', 'POULTRY');
      localStorage.setItem('lang', 'ar');
      this.router.navigate(['/home']);
    }else if(val == 'feeding'){
      localStorage.setItem('flow', 'FEEDING');
      localStorage.setItem('lang', 'ar');
      this.router.navigate(['/feeding/feed-home']);
    }
  }
}
