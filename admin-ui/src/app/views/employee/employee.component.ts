import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: 'employee.component.html'
})
export class EmployeeComponent implements OnInit {

  loading = false;
  employeesList: any[];
  defaultProfilePic = "assets/img/avatars/Blank-Profile.png";

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {

    this.loading = true;
    this.employeeService.getAllEmployees()
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.employeesList = resp.dataList;
                            console.log(this.employeesList)
                          }
                          else{
                            alert("failed");
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          alert("failed");
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
