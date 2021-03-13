import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '../../../shared/employee/employee.service';
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

  constructor(private alertService: AlertService, private orderService: OrdersService,
              private empService: EmployeeService){
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
                        this.total = resp.data;
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

  customerDetails: any;
  empDetails: any;

  getEmployeeInfo(empId){
    this.empService.getEmployeesById(empId)
                   .subscribe((resp:any)=>{
                    if(resp.statusCode === 200){
                      this.empDetails = resp.dataList[0];
                    }
                    else{
                      alert("failed");
                    }
                   },
                   (error: any) =>{
                     alert("failed");
                   })
  }

  getEmployeeFirstName(){
    if(this.empDetails !== undefined){
      return this.empDetails.firstName;
    }
  }

  getEmployeeLastName(){
    if(this.empDetails !== undefined){
      return this.empDetails.lastName;
    }
  }

  getEmployeeMobile(){
    if(this.empDetails !== undefined){
      return this.empDetails.mobile;
    }
  }

  getEmployeeId(){
    if(this.empDetails !== undefined){
      return this.empDetails.employeeId;
    }
  }

  getCustomerInfo(id){
    this.empService.getCustomerById(id)
                  .subscribe((resp:any)=>{
                    if(resp.statusCode === 200){
                      this.customerDetails = resp.data;
                    }
                    else{
                      alert("failed");
                    }
                  },
                  (error: any) =>{
                    alert("failed");
                  })
  }

  getCustomerFirstName(){
    if(this.customerDetails !== undefined){
      return this.customerDetails.firstName;
    }
  }

  getCustomerLastName(){
    if(this.customerDetails !== undefined){
      return this.customerDetails.lastName;
    }
  }

  getCustomerMobile(){
    if(this.customerDetails !== undefined){
      return this.customerDetails.mobile;
    }
  }

  getCustomerDoorNumber(){
    if(this.customerDetails !== undefined && this.customerDetails.customerAddress !== null){
      return this.customerDetails.customerAddress[0].doorNumber;
    }
  }

  getCustomerStreet(){
    if(this.customerDetails !== undefined && this.customerDetails.customerAddress !== null){
      return this.customerDetails.customerAddress[0].street;
    }
  }

  getCustomerCity(){
    if(this.customerDetails !== undefined && this.customerDetails.customerAddress !== null){
      return this.customerDetails.customerAddress[0].city;
    }
  }

  getCustomerPin(){
    if(this.customerDetails !== undefined && this.customerDetails.customerAddress !== null){
      return this.customerDetails.customerAddress[0].pincode;
    }
  }

  @ViewChild('printModal') myModal;
  orderId:string;
  showPrintBill(id){
    this.orderId = id;
    this.myModal.show();
  }

  getPDF(){
    this.loading = true;
    this.orderService.getPDF(this.orderId)
                    .subscribe((resp: any) => {
                        window.open(window.URL.createObjectURL( new Blob([resp], { type: 'application/pdf' })),"_blank");
                        this.loading = false;
                        this.myModal.hide();
                    },
                    (error) => {
                      this.alertService.error("Something went wrong!", error)
                    });
  }

}
