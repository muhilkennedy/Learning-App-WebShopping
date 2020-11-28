import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../../../shared/orders/orders.service';
import { PosService } from '../../../shared/pos/pos.service';
import { AlertService } from '../../../shared/_alert';

@Component({
  selector: 'app-product-list',
  templateUrl: './online-transactions.component.html',
  styleUrls: ['./online-transactions.component.scss']
})
export class OnlineTransactionsComponent implements OnInit {

  loading = false;
  isFilterCollapsed: boolean = true;
  ordersDataList: any[];
  selectedProductList: any[] = new Array();
  dateCondition = 'eq';
  filterDate: Date;
  status: string = null;

  // MatPaginator Inputs
  offset = 0;
  total = 10;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 50];
  // MatPaginator Output
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private alertService: AlertService, private orderService: OrdersService){
  }

  ngOnInit(): void {
    this.getOrdersData(null, 0, null);
  }

  action(event:any){
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.getOrdersData(this.dateCondition, this.filterDate === undefined? 0 :new Date(this.filterDate).getTime(), this.status);
  }

  getOrdersData(dateCondition: string, filterDate: number, status: string){
    this.loading = true;
    this.orderService.getOrders(this.pageSize, this.offset, status, dateCondition, filterDate)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.ordersDataList = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error:any) => {
                      this.alertService.error('Something went Wrong....try again later!');
                    });
  }

  setProductData(order:any){
    this.selectedProductList.length = 0;
    let data: any[] = order.orderDetails;
    data.forEach(element => {
      this.selectedProductList.push(element);
    })
  }

  changeDateCondition(event){
    this.dateCondition = event.target.value;
  }

  fireDatefilter(){
    this.getOrdersData(this.dateCondition, this.filterDate === undefined? 0 :new Date(this.filterDate).getTime(), this.status);
  }

  changeStatusSelected(event:any){
    this.status = event.target.value;
    this.fireDatefilter();
  }

}
