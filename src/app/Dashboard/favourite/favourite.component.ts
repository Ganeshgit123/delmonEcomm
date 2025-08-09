import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {

  favoriteLength: any;
  favoriteData: any;
  userId: any;
  unFavData: any;
  websiteFlow: any;
  adminLogin: any;
  dir: any;
  options: AnimationOptions = {
    path: '../../../assets/images/Animations/82795-favorite-icon.json'
  };

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');

    this.authService.getFavorites().subscribe(
      (res: any) => {
        this.favoriteData = res.data;
        this.favoriteLength = this.favoriteData.length;
      })
  }


  removeFav(id: any) {
    this.unFavData = { 'productId': id, 'isFavorites': 0 };
    this.authService.setFavorites(this.unFavData).subscribe((res: any) => {
      this.ngOnInit();
      if (res.error == false) {
        this.toastr.success(res.message);
      }
    })
  }
}
