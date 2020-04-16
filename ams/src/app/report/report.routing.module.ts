import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstimateApprovalReportComponent } from './estimate-approval-report/estimate-approval-report.component';
import { DeviceDispatchedReportComponent } from './device-dispatched-report/device-dispatched-report.component'
import { ArchPerformanceReportComponent } from './arch-performance-report/arch-performance-report.component';
export const DASHBOARD_ROUTES: Routes = [
    { path: 'EstimateApprovalReport', component: EstimateApprovalReportComponent },
    { path: 'DeviceDispatchedReport', component: DeviceDispatchedReportComponent },
    { path: 'ArcPerformanceReport', component: ArchPerformanceReportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})

export class ReportRoutingModule { }