import { Component, OnInit } from '@angular/core';
import { AdminCustomerService} from '../../../shared/employee/admin-customer.service';
import {PageEvent} from '@angular/material/paginator';
import { AlertService } from '../../../shared/_alert';
import { EmployeeService } from '../../../shared/employee/employee.service';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  loading = false;
  customersList: any[];
  defaultProfilePic = "assets/img/avatars/Blank-Profile.png";
  addressList: any[] = new Array();
  customer: any;

  alertoptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  // MatPaginator Inputs
  offset = 0;
  total = 10;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 50];
  // MatPaginator Output
  pageEvent: PageEvent;


  constructor(private customerService: AdminCustomerService,
              private alertService: AlertService)
  {

  }
  

  action(event){
    this.loading = true;
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.customerService.getAllCustomers(this.offset, this.pageSize)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.customersList = resp.dataList;
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

  ngOnInit(): void {
    this.loading = true;
    this.customerService.getAllCustomersCount()
                        .subscribe((resp:any) => {
                          this.total = resp.data;
                          this.customerService.getAllCustomers(this.offset, this.pageSize)
                              .subscribe((resp:any) => {
                                if(resp.statusCode === 200){
                                  this.customersList = resp.dataList;
                                  
                                }
                                else{
                                  this.alertService.error('Failed : ' + resp.errorMessages);
                                }
                                this.loading = false;
                              },
                              (error:any) => {
                                this.alertService.error('Something went Wrong....try again later!');
                              });
                        },
                        (error) => {
                          this.alertService.error('Something went Wrong....try again later!');
                        });
  }

  

  getProfilePic(picData:any){
    if(picData === undefined || picData === null){
      return this.defaultProfilePic;
    }
    else{
      return picData;
    }
  }

  getCustomerAddress(cust:any){
    this.addressList.length = 0;
    let data: any[] = cust;
    data.forEach(element => {
      this.addressList.push(element);
    })
  }

  setCustomerStatus(cust: any){
    this.customer = cust;
    return this.customer!=null || this.customer!=undefined ? this.customer.active : false;
  }
  
  slidetoggle(customer: any){
      this.loading = true;
      this.customerService.changeCustomerStatus(customer)
                        .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          customer.active = resp.data.active;
                          (customer.active === true) ?
                          this.alertService.success("Customer "+customer.firstName+" "+customer.lastName+" is Activated", this.alertoptions)
                          : this.alertService.warn("Customer "+customer.firstName+" "+customer.lastName+" is Locked", this.alertoptions);
                        }
                        else if(resp.statusCode === 503){
                          this.alertService.error('Operation Failed : ' + resp.errorMessages);
                        }
                        this.loading = false;
                      },
                      (error:any) => {
                        this.alertService.error('Something went wrong... Try again later!');
                        this.loading = false;
                      });
  }
  
  
}

