import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
    selector: 'app-navbar-f',
    templateUrl: './navbar-f.component.html',
    styleUrls: ['./navbar-f.component.css'],
    standalone: false
})
export class NavbarFComponent {

  lang: any;
  dir: any;

  categoryList: any = [];
  loggedUser:any;
  userList: any;

  constructor(public translate: TranslateService,private authService:AuthService, private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {

    this.loggedUser = sessionStorage.getItem('isLogged');
    this.lang = localStorage.getItem("lang") || "ar";
    this.translate.use(this.lang);
    this.dir = localStorage.getItem("dir") || "rtl"

    this.dir = localStorage.getItem("dir") || "rtl"
    if(this.loggedUser){
      this.authService.getUser().subscribe(
        (res: any) => {
          this.userList = res.data;
        })
    }
    this.authService.getCategory("FEEDING").subscribe(
      (res: any) => {
        this.categoryList = res.data.category;
        // console.log("few",this.categoryList)
      }
    );
  }

  getProduct(id:any){
    this.router.navigate([`/categories/${id}`])
  }

  feedSelect(){
    localStorage.setItem('flow', 'POULTRY');
    this.router.navigate(['/home']);
  }

  cart(){
    if (this.loggedUser == 'true') {
      this.router.navigate([`/cart`])
    }
    else {
      this.router.navigate([`/phone`])
    }
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
