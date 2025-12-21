import { NgModule, LOCALE_ID } from '@angular/core';
import { AuthInterceptor } from "./shared/auth.interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './Login/account/account.component';
import { PhoneComponent } from './Login/phone/phone.component';
import { EmployeeComponent } from './Login/employee/employee.component';
import { NumberComponent } from './Login/number/number.component';
import { OtpComponent } from './Login/otp/otp.component';
import { FreshComponent } from './fresh/fresh.component';
import { BasketComponent } from './basket/basket.component';
import { DescriptionComponent } from './description/description.component';
import { LookingComponent } from './looking/looking.component';
import { ReceipiesComponent } from './receipies/receipies.component';
import { EditComponent } from './Dashboard/edit/edit.component';
import { OrderComponent } from './Dashboard/order/order.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './Dashboard/payment/payment.component';
import { LoginBarComponent } from './login-bar/login-bar.component';
import { WalletComponent } from './Dashboard/wallet/wallet.component';
import { AddressComponent } from './Dashboard/address/address.component';
import { FavouriteComponent } from './Dashboard/favourite/favourite.component';
import { HelpComponent } from './Dashboard/help/help.component';
import { PointsComponent } from './Dashboard/points/points.component';
import { SettingsComponent } from './Dashboard/settings/settings.component';
import { FeedbackComponent } from './Dashboard/feedback/feedback.component';
import { TabComponent } from './tab/tab.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { BookingCompleteComponent } from './booking-complete/booking-complete.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';

// import { AuthInterceptor } from "./shared/auth.interceptor";

import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BasketListComponent } from './basket-list/basket-list.component';
import { FeedingModule } from './feeding/feeding.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminBasketComponent } from './admin-basket/admin-basket.component';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
registerLocaleData(localeAr);

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function playerFactory() {
  return player;
}

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        AccountComponent,
        PhoneComponent,
        EmployeeComponent,
        NumberComponent,
        OtpComponent,
        FreshComponent,
        BasketComponent,
        DescriptionComponent,
        LookingComponent,
        ReceipiesComponent,
        EditComponent,
        OrderComponent,
        CartComponent,
        FooterComponent,
        SearchComponent,
        PaymentComponent,
        LoginBarComponent,
        WalletComponent,
        AddressComponent,
        FavouriteComponent,
        HelpComponent,
        PointsComponent,
        SettingsComponent,
        FeedbackComponent,
        TabComponent,
        IngredientsComponent,
        BookingCompleteComponent,
        BasketListComponent,
        AdminBasketComponent,
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        BrowserModule,
        FeedingModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MomentDateModule,
        MatTabsModule,
        MatButtonToggleModule,
        CarouselModule,
        FormsModule,
        NgbModule,
        NgOtpInputModule,
        MatRadioModule,
        LottieModule.forRoot({ player: playerFactory }),
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'ar',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })], providers: [
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'ar-BH'
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
