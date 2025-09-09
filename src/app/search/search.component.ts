import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  value: any;
  getProducts: any;
  recentSearches: any[] = [];
  trendingProducts: any[] = [];
  clickSearch: any;
  productLength: any;
  dir: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    this.auth.getTrendingProducts().subscribe(
      (res: any) => {
        this.trendingProducts = res.data;
      });
    const searchLocal: any = localStorage.getItem('searchPoulValue');
    this.recentSearches = JSON.parse(searchLocal);
  }

  addValue(value: any) {
    // Push the new value to the array
    this.recentSearches.push(value);

    // Check if the array length exceeds the limit
    if (this.recentSearches?.length > 5) {
      // If the array length exceeds the limit, remove the oldest value
      this.recentSearches?.shift();
    }
    this.recentSearches = Array.from(new Set(this.recentSearches));
    localStorage.setItem('searchPoulValue', JSON.stringify(this.recentSearches));
  }

  sendValue(value: any) {
    this.clickSearch = value;
    this.addValue(value);
    this.auth.searchProduct(value).subscribe((res: any) => {
      this.getProducts = res.data;
      this.productLength = this.getProducts.length;
      this.ngOnInit();
    })
  }
}
