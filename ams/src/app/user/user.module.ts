import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from "./user.routing.module";
import { LoginComponent } from './login/login.component';
import { MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { UserService } from './user.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }