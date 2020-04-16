import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";

export const USER_ROUTES: Routes = [
    { path: 'ind', component: LoginComponent },
    { path: 'idn', component: LoginComponent },
    { path: 'ph', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(USER_ROUTES)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
