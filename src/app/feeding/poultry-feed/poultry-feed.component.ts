import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-poultry-feed',
  templateUrl: './poultry-feed.component.html',
  styleUrls: ['./poultry-feed.component.css']
})

export class PoultryFeedComponent implements OnInit {
  @Input() subCategoryId: any;
  ProductList: any;
  dir: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.dir = localStorage.getItem("dir") || "rtl";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subCategoryId'].currentValue != undefined || changes['subCategoryId'].currentValue != null) {
      this.auth.getProduct(this.subCategoryId).subscribe((res: any) => {
        this.ProductList = res.data;
        // console.log("this.ProductList", this.ProductList);
      });
    }
  }
}
