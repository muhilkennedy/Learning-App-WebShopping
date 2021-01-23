import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderHistoryComponent, DialogData } from '../order-history.component';

@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.scss']
})
export class OrdersDialogComponent implements OnInit {

  orderDetails:any[] = new Array();

  constructor(
    public dialogRef: MatDialogRef<OrderHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.orderDetails = data.orderDetails;
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
