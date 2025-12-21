import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'delmon';
  lang: any;
  dir: any;
  mobile = false;
  optionsone: AnimationOptions = {
    path: '../../../assets/images/feeding/27169-apple-download.json'
  };
  optionstwo: AnimationOptions = {
    path: '../../../assets/images/feeding/27173-googleplay-button.json'
  };
  constructor(private translateservice: TranslateService, private breakpointObserver: BreakpointObserver,) {
    this.breakpointObserver.observe([
      "(max-width: 767px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches === true) {
        // hide stuff      
        this.mobile = true;
      } else {
        // show stuff
        this.mobile = false;
      }
    });
    const lang = localStorage.getItem("lang") || "ar";
    const dir = localStorage.getItem("dir") || "rtl";
    this.translateservice.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }
  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "ar";
    this.dir = localStorage.getItem("dir") || "rtl";
  }
}
