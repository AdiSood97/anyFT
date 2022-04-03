import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemeOneComponent } from './themes/theme-one/theme-one.component';
import { ExploreOneComponent } from './themes/explore-one/explore-one.component';
import { ExploreTwoComponent } from './themes/explore-two/explore-two.component';
import { ExploreThreeComponent } from './themes/explore-three/explore-three.component';
import { ExploreFourComponent } from './themes/explore-four/explore-four.component';
import { LiveAuctionsComponent } from './themes/live-auctions/live-auctions.component';
import { ItemDetailsComponent } from './themes/item-details/item-details.component';
import { ActivityComponent } from './themes/activity/activity.component';
import { AuthorsComponent } from './themes/authors/authors.component';
import { AuthorComponent } from './themes/author/author.component';
import { WalletConnectComponent } from './themes/wallet-connect/wallet-connect.component';
import { CreateComponent } from './themes/create/create.component';
import { LoginComponent } from './themes/login/login.component';
import { SignupComponent } from './themes/signup/signup.component';
import { ContactComponent } from './themes/contact/contact.component';
import { BlogComponent } from './themes/blog/blog.component';
import { BlogSingleComponent } from './themes/blog-single/blog-single.component';
import { HelpCenterComponent } from './themes/help-center/help-center.component';

const routes: Routes = [
  {path: '', component: ThemeOneComponent},
  {path: 'explore-one', component: ExploreOneComponent},
  {path: 'explore-two', component: ExploreTwoComponent},
  {path: 'explore-three', component: ExploreThreeComponent},
  {path: 'explore-four', component: ExploreFourComponent},
  {path: 'auctions', component: LiveAuctionsComponent},
  {path: 'item-details/:itemid', component: ItemDetailsComponent},
  {path: 'activity', component: ActivityComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'author/:userid', component: AuthorComponent},
  {path: 'wallet-connect', component: WalletConnectComponent},
  {path: 'create', component: CreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog-single', component: BlogSingleComponent},
  {path: 'help-center', component: HelpCenterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
