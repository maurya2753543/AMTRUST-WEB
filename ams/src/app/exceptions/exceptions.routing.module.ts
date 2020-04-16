import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArcExceptionsComponent } from './arc-exceptions/arc-exceptions.component';
import {LspExceptionsComponent} from './lsp-exceptions/lsp-exceptions.component';
export const DASHBOARD_ROUTES: Routes = [
    { path: 'arc', component: ArcExceptionsComponent },
    { path: 'lsp', component: LspExceptionsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})

export class ExceptionsRoutingModule { }
