import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {DateFormatWtPipe} from './pipes/utc-date-formatter.pipe';
import {DateFormatDTPipe} from './pipes/date-format-device-tacking.pipe';
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
    FlexLayoutModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    DateFormatWtPipe,
    DateFormatDTPipe
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    DateFormatWtPipe,
    DateFormatDTPipe
  ]
})
export class SharedModule { }