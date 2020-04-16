import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDownloadComponent } from './invoice-download/invoice-download.component';
export const DASHBOARD_ROUTES: Routes = [
    { path: 'upload', component: InvoiceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})

export class InvoicesRoutingModule { }
