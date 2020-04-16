import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
// import { UploadedFilesComponent } from './uploaded-files/uploaded-files.component';

/*Main Routing module wise with security check, we have written security check 
under DI [AuthGuard], if user is log in then they may move from one module to another module.
*/

export const APP_ROUTES: Routes = [{
    path: '',
    children: [
        { path: 'login', loadChildren: './user/user.module#UserModule' },
        { path: 'analytic', canActivate: [AuthGuard], loadChildren: './analytic/analytic.module#AnalyticModule' },
        { path: 'ams-dashboard', canActivate: [AuthGuard], loadChildren: './amc/amc-dashboard.module#AMCDashboardModule' },
        { path: 'report', canActivate: [AuthGuard], loadChildren: './report/report.module#ReportModule' },
        { path: 'invoices', canActivate: [AuthGuard], loadChildren: './invoices/invoices.module#InvoicesModule' },
        { path: 'upload',  canActivate: [AuthGuard], loadChildren: './upload/upload.module#UploadModule' },
        { path: 'exceptions',  canActivate: [AuthGuard], loadChildren: './exceptions/exceptions.module#ExceptionsModule' }   
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES, {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
    // providers: []
})

export class AppRoutingModule { }
