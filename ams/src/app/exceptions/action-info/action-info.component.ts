import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent implements OnInit {
  actionMsgTitle="ooooo";
  actionMsgScenerio1="";
  actionMsgScenerio2="";
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ActionInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    var obj = {
      "textChange": this.dialogRef._containerInstance._config.data.dialogText
    }
    if (obj.textChange =="arc"){
      this.actionMsgTitle="Action required to handle no ARC found scenerio."
      this.actionMsgScenerio1="1. Check if brand and city entered correctly in CRM.";
      this.actionMsgScenerio2="2. Check with FOM-CORE support team if the mapping is done correctly.";
    }else if(obj.textChange =="lsp"){
      this.actionMsgTitle="Action required to handle no LSP found scenerio."
      this.actionMsgScenerio1="1. Check if pickup city and brand are entered correctly in CRM.";
      this.actionMsgScenerio2="2. Check with FOM-CORE support team if the mapping is done correctly.";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
