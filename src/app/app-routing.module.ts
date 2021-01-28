import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelleraddproductComponent} from './components/selleraddproduct/selleraddproduct.component';
import {AnalysisComponent} from './components/analysis/analysis.component';
import {ProfileComponent} from './components/profile/profile.component';
import{ProfiledetailsComponent} from './components/profiledetails/profiledetails.component';
import{PracticerxjsComponent} from './components/practicerxjs/practicerxjs.component';
import {AuthenticationGuard} from './authentication.guard'
const routes: Routes = [
  {path:"sellersaddproduct", component:SelleraddproductComponent},
  {path:'analysis', component:AnalysisComponent},
  {path:'', redirectTo:"/sellersaddproduct", pathMatch:"full" },
  {path:'profile', component:ProfileComponent},
  {path:'profiledetails/:id', component:ProfiledetailsComponent,canActivate:[AuthenticationGuard]},
  {path:'rxjs', component:PracticerxjsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
