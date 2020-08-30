import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee/employee.service';
import {PageEvent} from '@angular/material/paginator';
import { AlertService } from '../../shared/_alert';

@Component({
  selector: 'app-employee',
  templateUrl: 'employee.component.html'
})
export class EmployeeComponent implements OnInit {

  loading = false;
  employeesList: any[];
  defaultProfilePic = "assets/img/avatars/Blank-Profile.png";

  // MatPaginator Inputs
  offset = 0;
  total = 10;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 50];
  // MatPaginator Output
  pageEvent: PageEvent;


  constructor(private employeeService: EmployeeService,
              private alertService: AlertService)
  {

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  action(event){
    this.loading = true;
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.employeeService.getAllEmployees(this.offset, this.pageSize)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.employeesList = resp.dataList;
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

  refreshEmployeeList(){
    this.loading = true;
    let empIds = new Array();
    this.employeesList.forEach(emp => {
      empIds.push(emp.employeeId);
    });
    this.employeeService.getEmployeesById(empIds)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.employeesList = resp.dataList;
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
    this.employeeService.getAllEmployeesCount()
                        .subscribe((resp:any) => {
                          this.total = resp.data;
                          this.employeeService.getAllEmployees(this.offset, this.pageSize)
                              .subscribe((resp:any) => {
                                if(resp.statusCode === 200){
                                  this.employeesList = resp.dataList;
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

  isloggedIn(employeeStatus:any){
    if(employeeStatus === true){
      return true;
    }
    else{
      return false;
    }
  }


}
