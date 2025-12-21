import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.css'],
    standalone: false
})
export class PhoneComponent implements OnInit {
  websiteFlow:any;
  sendOtpvalue!: FormGroup;
  submitted = false;
  settings: any;
  params: any;

  constructor(public auth: AuthService, private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute,) { 
    this.sendOtpvalue = this.builder.group({
      countryCode: [''], mobileNumber: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.params = params['text']; 
    });
    this.websiteFlow = localStorage.getItem('flow');

    this.auth.settingsUrl().subscribe(
      (res: any) => {
        this.settings = res.data;
        this.sendOtpvalue = this.builder.group({
          countryCode: [this.settings.countryCode],
          mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{8}")]],
        });
      });

  }
  get f() { return this.sendOtpvalue.controls; }

  sendOtpdata() {
    this.submitted = true;
    if (!this.sendOtpvalue.valid) {
      return false;
    }
    this.submitted = false;
    if(this.params == undefined){
      this.auth.sendOtpcheckUser(this.sendOtpvalue.value).subscribe((res: any) => {
        if (res.error == false) {
          if (res.data.isRegistered == true) {
            this.toastr.success('Success', res.message);
            // this.toastr.success('OTP', res.otp);
            this.router.navigate(['/otp']);
            sessionStorage.setItem("mobileNumber", this.sendOtpvalue.value.mobileNumber!!);
            sessionStorage.setItem("countryCode", this.sendOtpvalue.value.countryCode!!);
          } else {
            this.router.navigate(['/account']);
            sessionStorage.setItem("mobileNumber", this.sendOtpvalue.value.mobileNumber!!);
            sessionStorage.setItem("countryCode", this.sendOtpvalue.value.countryCode!!);
          }
        }
      })
    }else{
      const object = {
        mobileNumber: this.sendOtpvalue.value.mobileNumber
      }
      this.auth.adminLoginUser(object).subscribe((res: any) => {
        if (res.error == false) {
          if (res.data.isRegistered == true) {
            this.toastr.success('Success', res.message);
            this.router.navigate(['/categories']);
            sessionStorage.setItem("adminLogin", ('true'));
            sessionStorage.setItem("mobileNumber", this.sendOtpvalue.value.mobileNumber!!);
            sessionStorage.setItem("countryCode", this.sendOtpvalue.value.countryCode!!);
            sessionStorage.setItem("userId", res.data.id);
            sessionStorage.setItem("userType", res.data.userType);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem('isLogged', ('true'));
            sessionStorage.setItem('deliverrType', 'PICKUP');
          } else {
            this.router.navigate(['/account']);
            sessionStorage.setItem("mobileNumber", this.sendOtpvalue.value.mobileNumber!!);
            sessionStorage.setItem("countryCode", this.sendOtpvalue.value.countryCode!!);
          }
        }
      })
    }
  }

}
