import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodocomponentComponent } from './components/todocomponent/todocomponent.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {TaskserviceService} from './services/taskservice.service';
import{HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
//import { MatSliderModule } from '@angular/material/slider';
import {ErrorhandlingService} from './services/errorhandling.service';
import { CustomdatepipePipe } from './pipes/customdatepipe.pipe';
import {AngularmaterialModule} from './materials-module/materials-module.module';
import { SelleraddproductComponent } from './components/selleraddproduct/selleraddproduct.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfiledetailsComponent } from './components/profiledetails/profiledetails.component';
import { SecuritypipePipe } from './pipes/securitypipe.pipe';
import { PracticerxjsComponent } from './components/practicerxjs/practicerxjs.component';
import {AuthgaurdService} from './services/authgaurd.service';

@NgModule({
  declarations: [
    AppComponent,
    TodocomponentComponent,
    CustomdatepipePipe,
    SelleraddproductComponent,
    AnalysisComponent,
    ProfileComponent,
    ProfiledetailsComponent,
    SecuritypipePipe,
    PracticerxjsComponent
  ],
  imports: [
  
    AngularmaterialModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    HttpClientModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    ChartsModule
  ],
  providers: [TaskserviceService,ErrorhandlingService, CustomdatepipePipe,AuthgaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
