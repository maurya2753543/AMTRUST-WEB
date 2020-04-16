import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { InvoicesRoutingModule } from './invoices.routing.module';
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { InvoiceService } from '../invoices/invoice.service';
import { InvoiceDownloadComponent } from './invoice-download/invoice-download.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    DataTablesModule,
    MatSortModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    NgUploaderModule,
    FormsModule,
    InvoicesRoutingModule
  ],
  declarations: [InvoiceDownloadComponent],
  providers: [InvoiceService]
})
export class InvoicesModule { }
