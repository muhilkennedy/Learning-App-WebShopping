import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, PosHistoryComponent } from '../pos-history.component';

@Component({
  selector: 'app-pos-dialog',
  templateUrl: './pos-dialog.component.html',
  styleUrls: ['./pos-dialog.component.scss']
})
export class PosDialogComponent implements OnInit {

  posDetails:any[] = new Array();

  constructor(
    public dialogRef: MatDialogRef<PosHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.posDetails = data.orderDetails;
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
