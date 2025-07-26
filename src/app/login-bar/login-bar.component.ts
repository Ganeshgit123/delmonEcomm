import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent implements OnInit{
  websiteFlow:any

  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');
  }
}
