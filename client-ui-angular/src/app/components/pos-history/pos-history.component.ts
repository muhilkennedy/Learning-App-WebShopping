import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/service/order/order.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
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

  constructor(private orderService: OrderService, public dialog: MatDialog,
              private commonService: CommonsService, private _snackBar: MatSnackBar) { }

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
                        this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
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
