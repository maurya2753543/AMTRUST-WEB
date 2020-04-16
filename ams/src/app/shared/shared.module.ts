import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatCheckboxModule,MatDatepickerModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {DateFormatWtPipe} from './pipes/utc-date-formatter.pipe';
import {DateFormatDTPipe} from './pipes/date-format-device-tacking.pipe';
import { ClientReportDataService } from '../services/client-report-data.service';
import { MyDatePickerModule } from '../../../node_modules/angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { ClientReportSelectDateComponent } from './client-report-select-date/client-report-select-date.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MyDatePickerModule,
    // BrowserAnimationsModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    DateFormatWtPipe,
    DateFormatDTPipe
  ],
  declarations: [
    HeaderComponent,
    ClientReportSelectDateComponent,
    MenuComponent,
    DateFormatWtPipe,
    DateFormatDTPipe,
    ClientReportSelectDateComponent
  ],
  entryComponents:[
    ClientReportSelectDateComponent
  ],
  providers:[
    ClientReportDataService
  ]
})
export class SharedModule { }