import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCompleteFComponent } from './booking-complete-f/booking-complete-f.component';
import { DescriptionFComponent } from './description-f/description-f.component';
import { HomeFComponent } from './home-f/home-f.component';
import { PoulFeedComponent } from './poul-feed/poul-feed.component';
import { PoultryFeedComponent } from './poultry-feed/poultry-feed.component';
import { SearchFComponent } from './search-f/search-f.component';

const routes: Routes = [
  {path:'feed-home',component:HomeFComponent},
  {path:'feed-description',component:DescriptionFComponent},
  {path:'feed-description/:id',component:DescriptionFComponent},
  {path:'feed-poultry',component:PoultryFeedComponent},
  {path:'feed-poul',component:PoulFeedComponent},
  

/*-------------------------------------------------------------------------*/ 
 {path:'feed-search',component:SearchFComponent},
 {path:'booking-complete',component:BookingCompleteFComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedingRoutingModule { }
