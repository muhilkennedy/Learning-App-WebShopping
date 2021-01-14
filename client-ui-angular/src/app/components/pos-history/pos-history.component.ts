import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/order/order.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';
import { PosDialogComponent } from './pos-dialog/pos-dialog.component';

export interface DialogData {
  orderDetails:any[];
}

@Component({
  selector: 'app-pos-history',
  templateUrl: './pos-history.component.html',
  styleUrls: ['./pos-history.component.scss']
})
export class PosHistoryComponent implements OnInit {

  loading = true;
  orders:any[] = new Array();

  constructor(private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getCustomerPOSOrders()
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

  setOrderItems(posDetails){
    const dialogRef = this.dialog.open(PosDialogComponent, {
      width: 'auto',
      data: {
        orderDetails: posDetails
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
