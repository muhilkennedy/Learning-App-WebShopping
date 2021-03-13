import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/service/order/order.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { OrdersDialogComponent } from './orders-dialog/orders-dialog.component';

export interface DialogData {
  orderDetails:any[];
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  loading = false;
  orders:any[] = new Array();

  constructor(private orderService: OrderService, public dialog: MatDialog,
              private commonService: CommonsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getOrders()
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.orders = resp.dataList;
                        }
                        this.loading = false;
                      },
                      (error: any) => {
                        this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                      })

  }

  setOrderItems(orderDetails){
    const dialogRef = this.dialog.open(OrdersDialogComponent, {
      width: 'auto',
      data: {
        orderDetails: orderDetails
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog(): void {

  }

}
