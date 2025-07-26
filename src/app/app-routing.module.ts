import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { BookingCompleteComponent } from './booking-complete/booking-complete.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './Dashboard/address/address.component';
import { EditComponent } from './Dashboard/edit/edit.component';
import { FavouriteComponent } from './Dashboard/favourite/favourite.component';
import { FeedbackComponent } from './Dashboard/feedback/feedback.component';
import { HelpComponent } from './Dashboard/help/help.component';
import { OrderComponent } from './Dashboard/order/order.component';
import { PaymentComponent } from './Dashboard/payment/payment.component';
import { PointsComponent } from './Dashboard/points/points.component';
import { SettingsComponent } from './Dashboard/settings/settings.component';
import { WalletComponent } from './Dashboard/wallet/wallet.component';
import { DescriptionComponent } from './description/description.component';
import { FreshComponent } from './fresh/fresh.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

import { AccountComponent } from './Login/account/account.component';
import { EmployeeComponent } from './Login/employee/employee.component';
import { NumberComponent } from './Login/number/number.component';
import { OtpComponent } from './Login/otp/otp.component';
import { PhoneComponent } from './Login/phone/phone.component';

import { LookingComponent } from './looking/looking.component';
import { ReceipiesComponent } from './receipies/receipies.component';
import { SearchComponent } from './search/search.component';
import { TabComponent } from './tab/tab.component';
import { BasketListComponent } from './basket-list/basket-list.component';
import { AdminBasketComponent } from './admin-basket/admin-basket.component';
import { PoulFeedComponent } from './feeding/poul-feed/poul-feed.component';

const routes: Routes = [
  {path:'',component:LookingComponent},
  {path:'my_profile',component:TabComponent},
  {path:'search',component:SearchComponent},
  {path:'payment',component:PaymentComponent},
  {path:'cart',component:CartComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'settings',component:SettingsComponent},
  {path:'help',component:HelpComponent},
  {path:'points',component:PointsComponent},
  {path:'address',component:AddressComponent},
  {path:'favourite',component:FavouriteComponent},
  {path:'wallet',component:WalletComponent},
  {path:'order',component:OrderComponent},
  {path:'booking-complete',component:BookingCompleteComponent},
  {path:'edit',component:EditComponent},
  {path:'description',component:DescriptionComponent},
  {path:'description/:id',component:DescriptionComponent},
  {path:'receipies',component:ReceipiesComponent},
  {path:'categories',component:FreshComponent},
  {path:'home',component:HomeComponent},
  {path:'feed',component:PoulFeedComponent},
  {path:'feed/:id',component:PoulFeedComponent},
  {path:'categories/:id',component:FreshComponent},
  {path:'account',component:AccountComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'phone',component:PhoneComponent},
  {path:'phone/:text',component:PhoneComponent},
  {path:'number',component:NumberComponent},
  {path:'otp',component:OtpComponent},
  {path:'basket',component:BasketComponent},
  {path:'basket/:id',component:BasketComponent},
  {path:'admin-basket',component:AdminBasketComponent},
  {path:'admin-basket/:id',component:AdminBasketComponent},
  {path:'basket-list',component:BasketListComponent},
  {path:'ingredients',component:IngredientsComponent},
  {path:'ingredients/:id',component:IngredientsComponent},
  {path: "feeding",loadChildren: () => import("./feeding/feeding.module").then((m) => m.FeedingModule),}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
