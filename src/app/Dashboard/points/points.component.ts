import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
    selector: 'app-points',
    templateUrl: './points.component.html',
    styleUrls: ['./points.component.css'],
    standalone: false
})
export class PointsComponent {

  loyaltyData: any;
  totalLoyaltyPoint: any;
  websiteFlow: any;
  dir: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.websiteFlow = localStorage.getItem('flow');

    this.auth.getLoyaltyPoints().subscribe((res: any) => {
      // console.log("Loyalty Points",res.data);
      this.loyaltyData = res.data;
      this.totalLoyaltyPoint = res.loyaltyPoint;
    })
  }
}
