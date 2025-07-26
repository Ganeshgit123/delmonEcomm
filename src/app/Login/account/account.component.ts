import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {


  constructor(private auth: AuthService, private builder: FormBuilder, private router: Router) { }

  sentNormaluser() {
    const data = {
      userType: ('USER'),
      mobileNumber: Number(sessionStorage.getItem('mobileNumber')),
      countryCode: sessionStorage.getItem('countryCode')
    }
    this.auth.verifyUser(data).subscribe((res: any) => {
      if (res.error == false) {
        sessionStorage.setItem("userType",'USER');
        this.router.navigate(['/otp']);
      }
    })

  }

}
