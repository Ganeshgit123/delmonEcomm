import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedingRoutingModule } from './feeding-routing.module';
import { DescriptionFComponent } from './description-f/description-f.component';
import { NavbarFComponent } from './navbar-f/navbar-f.component';
import { LoginBarFComponent } from './login-bar-f/login-bar-f.component';

import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedUiShimsModule } from '../shared/ui-shims/shared-ui-shims.module';
import { FooterFComponent } from './footer-f/footer-f.component';
import { SearchFComponent } from './search-f/search-f.component';
import { HomeFComponent } from './home-f/home-f.component';
import { PoultryFeedComponent } from './poultry-feed/poultry-feed.component';
import { PoulFeedComponent } from './poul-feed/poul-feed.component';
import { BookingCompleteFComponent } from './booking-complete-f/booking-complete-f.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    DescriptionFComponent,
    NavbarFComponent,
    LoginBarFComponent,
    FooterFComponent,
    SearchFComponent,
    HomeFComponent,
    PoultryFeedComponent,
    PoulFeedComponent,
    BookingCompleteFComponent,


  ],
  imports: [
    CommonModule,
    FeedingRoutingModule,
    MatExpansionModule,
    SharedUiShimsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatTreeModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    NgOtpInputModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarFComponent
  ]
})
export class FeedingModule { }
