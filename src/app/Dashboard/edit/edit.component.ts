import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    standalone: false
})
export class EditComponent {
  profileForm!: FormGroup;
  userList: any;
  phoneNumber: any;
  submitted = false;
  websiteFlow: any;
  adminLogin: any;

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router, public fb: FormBuilder) {
    this.profileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      deviceToken: [''],
    })
  }

  ngOnInit(): void {
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');

    this.auth.getUser().subscribe(
      (res: any) => {
        this.userList = res.data;
        this.phoneNumber = this.userList.mobileNumber;
        this.profileForm = this.fb.group({
          userName: [this.userList.userName, Validators.required],
          email: [this.userList.email, Validators.required],
          deviceToken: ['']
        });
      })
  }
  get f() { return this.profileForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.submitted = false;
    this.auth.profileUpdate(this.profileForm.value).subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success('Success', res.message);
      } else {
        this.toastr.success('Error', res.message);
      }
    })
  }
}
