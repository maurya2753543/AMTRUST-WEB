import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicComponentService } from "./services/dynamic-component.service";
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './guard/auth.guard';
//import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EstimationApprovalServiceService } from './services/estimation-approval-service.service';
import { ZoomEstimateApprovalComponent } from './amc/zoom-estimate-approval/zoom-estimate-approval.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthService } from '@app/services/auth.service';
import { ArcListServiceService } from './services/arc-list-service.service'
import { MessageService } from './services/message.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
// import { UploadedFilesComponent } from './uploaded-files/uploaded-files.component';
// import { EstimateApprovalReportComponent } from './report/estimate-approval-report/estimate-approval-report.component';


@NgModule({
  declarations: [
    AppComponent
    // EstimateApprovalReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  entryComponents:[
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    DynamicComponentService,
    EstimationApprovalServiceService,
    ArcListServiceService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
