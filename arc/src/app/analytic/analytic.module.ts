import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AnalyticRoutingModule } from "./analytic.routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {MatButtonModule,MatProgressSpinnerModule, MatCheckboxModule, MatCardModule,MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { AnalyticComponent } from './analytic/analytic.component';
import { EstimatedTatComponent } from './estimated-tat/estimated-tat.component';
import { EstimatedDetailComponent } from './estimated-detail/estimated-detail.component';
import { RepairTatComponent } from './repair-tat/repair-tat.component';
import { RepairDetailComponent } from './repair-detail/repair-detail.component';
import { ApprovalTatComponent } from './approval-tat/approval-tat.component';
import { ApprovalDetailComponent } from './approval-detail/approval-detail.component';
import { DispatchTatComponent } from './dispatch-tat/dispatch-tat.component';
import { DispatchDetailComponent } from './dispatch-detail/dispatch-detail.component';
import { CostTatComponent } from './cost-tat/cost-tat.component';
import { PendingTatComponent } from './pending-tat/pending-tat.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnalyticService} from './analytic.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AnalyticRoutingModule,
    SharedModule,
    MatButtonModule,
    DataTablesModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgUploaderModule,
    ChartsModule,
    FormsModule
  ],
  entryComponents: [
    AnalyticComponent,
    EstimatedTatComponent,
    EstimatedDetailComponent,
    RepairTatComponent,
    RepairDetailComponent,
    ApprovalTatComponent,
    ApprovalDetailComponent,
    DispatchTatComponent,
    DispatchDetailComponent,
    CostTatComponent,
    PendingTatComponent
  ],
  declarations: [
    AnalyticComponent,
    EstimatedTatComponent,
    EstimatedDetailComponent,    
    RepairTatComponent,
    RepairDetailComponent,
    ApprovalTatComponent,
    ApprovalDetailComponent,
    DispatchTatComponent,
    DispatchDetailComponent,
    CostTatComponent,
    PendingTatComponent
  ],
  providers: [
    AnalyticService
   ],
   schemas:[
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
   ]
})
export class AnalyticModule { }
