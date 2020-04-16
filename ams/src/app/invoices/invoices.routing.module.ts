import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceDownloadComponent } from './invoice-download/invoice-download.component';
export const DASHBOARD_ROUTES: Routes = [
    { path: 'download', component: InvoiceDownloadComponent }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})

export class InvoicesRoutingModule { }
