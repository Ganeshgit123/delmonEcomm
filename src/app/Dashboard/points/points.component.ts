import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {

  loyaltyData: any;
  totalLoyaltyPoint: any;
  websiteFlow: any;

  constructor(private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');

    this.auth.getLoyaltyPoints().subscribe((res: any) => {
      // console.log("Loyalty Points",res.data);
      this.loyaltyData = res.data;
      this.totalLoyaltyPoint = res.loyaltyPoint;
    })
  }
}
