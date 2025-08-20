import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  websiteFlow: any;
  adminLogin: any;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');
  }

  logOut() {
    this.toastr.success("Success", "Logout Successfully");
    sessionStorage.clear();
    if (this.websiteFlow == 'POULTRY') {
      this.router.navigate(['/home']);
    }
    else if (this.websiteFlow == 'FEEDING') {
      this.router.navigate(['/feeding/feed-home']);
    }
  }

}
