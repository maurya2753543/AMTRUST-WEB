import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticComponent } from "./analytic/analytic.component";

export const ANALYTIC_ROUTES: Routes = [
    { path: '', component: AnalyticComponent }
];

@NgModule({
    imports: [RouterModule.forChild(ANALYTIC_ROUTES)],
    exports: [RouterModule]
})

export class AnalyticRoutingModule { }