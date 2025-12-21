import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    standalone: false
})
export class FeedbackComponent {

  form: any;
  websiteFlow: any;
  adminLogin: any;

  constructor(private fb: FormBuilder, private auth:AuthService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');
    this.adminLogin = sessionStorage.getItem('adminLogin');
    
    this.form = this.fb.group({
      comment: [''],
    })

  }


  sendForm() {

    // console.log("Feedback",this.form.value);
    this.auth.sendFeedback(this.form.value).subscribe((res:any) => {
      this.toastr.success(res.massage);
    })
    this.form.reset(this.form.value);
    this.ngOnInit();
  }

  options: AnimationOptions = {
    path: '../../../assets/images/Animations/lf30_editor_q5uczxs3.json'
  };


}
