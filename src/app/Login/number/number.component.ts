import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent {

  sendCrvalue !: FormGroup;
  submitted = false;
  websiteFlow:any;

  constructor(private auth: AuthService, private builder: FormBuilder, private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {

    this.websiteFlow = localStorage.getItem('flow');
  //  console.log("sfe",this.websiteFlow);

    this.sendCrvalue = this.builder.group({
      userType: ["MERCHANT"],
      crNumber: ["", [Validators.required]],
    });
  }

  get f() { return this.sendCrvalue.controls; }

  sendCrdata() {

    this.submitted = true;

    if (this.sendCrvalue.invalid) {
      return;
    }
    this.submitted = false;
    const data = this.sendCrvalue.value;
    data['mobileNumber'] = Number(sessionStorage.getItem('mobileNumber'));
    data['countryCode'] = sessionStorage.getItem('countryCode');
    this.auth.verifyMerchant(data).subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success('Success', res.message);
        sessionStorage.setItem("userType",'MERCHANT');
        this.router.navigate(['/otp']);
      }
      else {
        this.toastr.success('Error', res.message);
      }
    })
  }



}
