import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ExceptionsRoutingModule } from "./exceptions.routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { FormsModule } from '@angular/forms';
import { ArcExceptionsComponent } from './arc-exceptions/arc-exceptions.component';
import { LspExceptionsComponent } from './lsp-exceptions/lsp-exceptions.component';
import { DataTablesModule } from 'angular-datatables';
import { MessageService } from '../services/message.service';
import { SortService } from '../services/table-sort.service';
import {ExceptionsService} from './exceptions.service';
import { ActionInfoComponent } from './action-info/action-info.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ExceptionsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgUploaderModule,
    FormsModule,
    DataTablesModule
    
  ],
  entryComponents:[
    ActionInfoComponent
  ],
  declarations: [
    ArcExceptionsComponent, 
    LspExceptionsComponent, 
    ActionInfoComponent,
    ActionInfoComponent],

  providers:[
    SortService,
    MessageService,
    ExceptionsService
  ]
})
export class ExceptionsModule { }

