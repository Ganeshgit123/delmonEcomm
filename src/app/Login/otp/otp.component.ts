import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp: any;
  websiteFlow: any;
  productId: any = 0;

  constructor(private auth: AuthService, private builder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');
    this.productId = sessionStorage.getItem('cart');
  }

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '60px',
      height: '50px',
    },
  };

  onOtpChange(event: any) {
    this.otp = event;
  }

  otpValue() {
    const object = {
      otp: Number(this.otp),
      mobileNumber: Number(sessionStorage.getItem('mobileNumber')),
      countryCode: sessionStorage.getItem('countryCode'),
    }
    this.auth.verifyOtp(object).subscribe((res: any) => {
      sessionStorage.setItem("userId", res.data.id);
      if (res.error == false) {
        this.toastr.success('Success', res.message);
        if (this.websiteFlow == 'POULTRY') {
          if (this.productId != 0) {
            this.router.navigate([`/description/${this.productId}`])
          }
          this.router.navigate(['/home']);
        }
        else if (this.websiteFlow == 'FEEDING') {
          this.router.navigate(['/feeding/feed-home']);
        }
        sessionStorage.setItem("userType", res.data.userType);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem('isLogged', ('true'));
        sessionStorage.setItem('deliverrType', 'PICKUP');
      }
      else {
        this.toastr.success('Error', res.message);
      }
    })
  }
}
