import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/order/order.service';
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

  constructor(private orderService: OrderService, public dialog: MatDialog) { }

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
                        alert("Something went wrong!");
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
