import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent{

  
  data: any

  constructor(@Inject(MAT_DIALOG_DATA) public parentData: any,public dialogRef: MatDialogRef<MyDialogComponent>) {
    this.data = parentData;
    console.log("Parent Data "+parentData)
  }
  close() {
    this.dialogRef.close("Closed");
  }

  update() {
    this.dialogRef.close(this.data);
  }
}
