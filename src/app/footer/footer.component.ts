import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})

export class FooterComponent {
  support: any;
  about: any;
  termsAndCondition: any;
  privacyPolicy: any;
  faq: any;

  constructor(public translate: TranslateService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.settingsUrl().subscribe((res: any) => {
      this.support = res.data.support;
      this.about = res.data.about;
      this.termsAndCondition = res.data.termsAndCondition;
      this.privacyPolicy = res.data.privacyPolicy
      this.faq = res.data.faq;
    })

  }
}
