import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';

/*Main Routing module wise with security check, we have written security check 
under DI [AuthGuard], if user is log in then they may move from one module to another module.
*/

export const APP_ROUTES: Routes = [{
    path: '',
    children: [
        { path: 'login', loadChildren: './user/user.module#UserModule' },
        { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'analytic', canActivate: [AuthGuard], loadChildren: './analytic/analytic.module#AnalyticModule' },
        { path: 'reports', canActivate: [AuthGuard], loadChildren: './reports/reports.module#ReportsModule' },
        { path: 'invoices', canActivate: [AuthGuard], loadChildren: './invoices/invoices.module#InvoicesModule' }
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES, {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})

export class AppRoutingModule { }
