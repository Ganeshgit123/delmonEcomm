import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  lang: any;
  dir: any;
  websiteFlow: any;
  userList: any;

  constructor(public translate: TranslateService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  categoryList: any = [];
  isLoggedIn = false;

  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');
    this.isLoggedIn = sessionStorage.getItem('isLogged') === 'true';
    this.lang = localStorage.getItem("lang") || "ar";
    this.translate.use(this.lang);
    this.dir = localStorage.getItem("dir") || "rtl"
    if (this.isLoggedIn) {
      this.authService.getUser().subscribe(
        (res: any) => {
          this.userList = res.data;
        })
    }

  }

  switchLang(lang: any) {
    const dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
    localStorage.setItem("dir", dir);
    // console.log("lang",localStorage)
    window.location.reload();

  }

  getProduct(id: any) {

    this.router.navigate([`/categories/${id}`])

  }

  feedSelect() {
    localStorage.setItem('flow', 'FEEDING');
    this.router.navigate(['/feeding/feed-home']);
  }

  cart() {
    if (this.isLoggedIn) {
      this.router.navigate([`/cart`])
    }
    else {
      this.router.navigate([`/phone`])
    }
  }

}
