import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: false
})
export class EmployeeComponent {

  sendEmpvalue !: FormGroup;
  submitted = false;
  websiteFlow: any;

  constructor(private auth: AuthService, private builder: FormBuilder, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {


    this.websiteFlow = localStorage.getItem('flow');
    //  console.log("sfe",this.websiteFlow);


    this.sendEmpvalue = this.builder.group({
      userType: ["EMPLOYEE"],
      employeeNumber: ["", [Validators.required]],
    });
  }

  get f() { return this.sendEmpvalue.controls; }


  sendEmpdata() {
    this.submitted = true;

    if (this.sendEmpvalue.invalid) {
      return;
    }
    this.submitted = false;
    const data = this.sendEmpvalue.value;
    data['mobileNumber'] = Number(sessionStorage.getItem('mobileNumber'));
    data['countryCode'] = sessionStorage.getItem('countryCode');

    this.auth.verifyEmployee(data).subscribe((res: any) => {

      if (res.error === false) {
        this.router.navigate(['/otp']);
        sessionStorage.setItem("userType", 'EMPLOYEE');
        this.toastr.success('Success', res.message);
      }
      else {
        this.toastr.success('Error', res.message);
      }
    })
  }



}
