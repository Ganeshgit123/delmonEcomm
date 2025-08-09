import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  support: any;
  about: any;
  termsAndCondition: any;
  privacyPolicy: any;
  faq: any;
  lang: any;
  dir: any;
  websiteFlow: any;

  constructor(public translate: TranslateService, private auth: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');

    this.lang = localStorage.getItem("lang") || "ar";
    this.translate.use(this.lang);
    this.dir = localStorage.getItem("dir") || "rtl"

    this.auth.settingsUrl().subscribe((res: any) => {
      this.support = res.data.support;
      this.about = res.data.about;
      this.termsAndCondition = res.data.termsAndCondition;
      this.privacyPolicy = res.data.privacyPolicy
      this.faq = res.data.faq;
    })

  }

  switchLang(lang: any) {
    if (lang == "ar") {
      var dir = "rtl";
    } else {
      var dir = "ltr";
    }
    localStorage.setItem("lang", lang);
    localStorage.setItem("dir", dir);
    // console.log("lang",localStorage)
    window.location.reload();

  }


}
