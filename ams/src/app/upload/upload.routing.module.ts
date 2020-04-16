import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadFilesComponent} from './upload-files/upload-files.component';

export const DASHBOARD_ROUTES: Routes = [
    { path: '', component: UploadFilesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})

export class UploadRoutingModule { }