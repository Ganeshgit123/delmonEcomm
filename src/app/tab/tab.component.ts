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
  viewOrder = false;
  viewAddress = false;
  walletPage = false;
  favouritePage = false;
  loyaltyPage = false;
  helpPage = false;
  settingPage = false;
  feedbackPage = false;
  viewProfile = true;
  adminLogin: any;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');
    //  console.log("sfe",this.websiteFlow);
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

  profile() {
    window.scroll(0, 0);
    this.viewProfile = true;
  }

  myOrder() {
    window.scroll(0, 0);
    this.viewOrder = true;
  }

  address() {
    window.scroll(0, 0);
    this.viewAddress = true;
  }

  wallet() {
    window.scroll(0, 0);
    this.walletPage = true;
  }

  favourite() {
    window.scroll(0, 0);
    this.favouritePage = true;
  }

  loyality() {
    window.scroll(0, 0);
    this.loyaltyPage = true;
  }

  help() {
    window.scroll(0, 0);
    this.helpPage = true;
  }

  settings() {
    window.scroll(0, 0);
    this.settingPage = true;
  }

  feedback() {
    window.scroll(0, 0);
    this.feedbackPage = true;
  }
}
