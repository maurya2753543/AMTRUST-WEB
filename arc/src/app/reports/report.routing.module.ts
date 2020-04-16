import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceInTransitReportComponent } from './device-in-transit-report/device-in-transit-report.component';
import { DeviceDispatchedReportComponent } from './device-dispatched-report/device-dispatched-report.component';
import {PendingEstimationReportComponent} from './pending-estimation-report/pending-estimation-report.component';
import {PendingForAmsReportComponent} from './pending-for-ams-report/pending-for-ams-report.component';
import {RepairInProgressReportComponent} from './repair-in-progress-report/repair-in-progress-report.component';
import {PendingForDispatchReportComponent} from './pending-for-dispatch-report/pending-for-dispatch-report.component';
import { DeviceDeliveredReportComponent } from './device-delivered-report/device-delivered-report.component'
export const DASHBOARD_ROUTES: Routes = [
    { path: 'DeviceInTransitReport', component: DeviceInTransitReportComponent },
    { path: 'DeviceDispatchedReport', component: DeviceDispatchedReportComponent },
    { path: 'PendingEstimationReport', component: PendingEstimationReportComponent },
    { path: 'PendingForAmsReport', component: PendingForAmsReportComponent },
    { path: 'RepairInProgressReport', component: RepairInProgressReportComponent },
    { path: 'PendingForDispatchReport', component: PendingForDispatchReportComponent },
    { path: 'DeviceDeliveredReport', component: DeviceDeliveredReportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})

export class ReportsRoutingModule { }