import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../../shared/employee/employee.service';

@Component({
  selector: 'app-employee-permission',
  templateUrl: './employee-permission.component.html',
  styleUrls: ['./employee-permission.component.css']
})
export class EmployeePermissionComponent implements OnInit {

  loading = false;
  email:string;
  employeeInfo: any;
  employeeName: string;
  activePermissions: number;
  allPermissions: any[];
  adminEnabled: boolean;
  managerEnabled: boolean;
  marketingEnabled: boolean;
  supportEnabled: boolean;

  emailFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private emplService: EmployeeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.emplService.getAllPermissions()
        .subscribe((resp: any)=>{
          this.allPermissions = resp.dataList;
          this.loading = false;
        },
        (error)=>{
          alert('error in fetching permissions')
        })
  }

  showcard(){
    return this.employeeName!=null || this.employeeName!= undefined;
  }

  slidetoggle(){
    this.loading = true;
    this.employeeInfo.active = !this.employeeInfo.active;
    this.emplService.changeEmployeeStatus(this.employeeInfo.employeeId, this.employeeInfo.active)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        //done snack bar
                      }
                      else if(resp.statusCode === 503){
                        alert(resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error:any) => {
                      alert("status change failed");
                      this.loading = false;
                    });
  }

  getEmployeeActive(){
    return this.employeeInfo!=null || this.employeeInfo!=undefined ? this.employeeInfo.active : false;
  }

  // All permissions are reffered statically hence any change in DB ket must be updated here.
  setPermissions(){
    this.employeeInfo.employeePermissions.forEach( permission => {
      if(permission.permission.permissionId == 1){
        this.adminEnabled = true;
      }
      if(permission.permission.permissionId == 2){
        this.managerEnabled = true;
      }
      if(permission.permission.permissionId == 3){
        this.marketingEnabled = true;
      }
      if(permission.permission.permissionId == 4){
        this.supportEnabled = true;
      }
    });
  }

  searchAction(){
    this.loading = true;
    this.reset();
    if(this.email != undefined || this.email != null){
      this.emplService.getEmployeeInfo(this.email)
                      .subscribe((resp: any) => {
                        if(resp.statusCode === 200){
                          this.employeeInfo = resp.data;
                          this.employeeName = this.employeeInfo.firstName + " " + this.employeeInfo.lastName;
                          this.activePermissions = this.employeeInfo.employeePermissions.length;
                          this.setPermissions();
                        }
                        else if(resp.statusCode === 503){
                          alert(resp.errorMessages);
                        }
                        this.loading = false;
                      },
                      (error) => {
                        alert("something went wrong!");
                        this.loading = false;
                      });
    }

  }

  reset(){
    this.employeeName = null;
    this.adminEnabled = false;
    this.managerEnabled = false;
    this.marketingEnabled = false;
    this.supportEnabled = false;
  }

  overridePermissions(){
    this.loading = true;
    let enabledPermissions:number[] = new Array(4);
    if(this.adminEnabled){
      enabledPermissions.push(1);
    }
    if(this.managerEnabled){
      enabledPermissions.push(2);
    }
    if(this.marketingEnabled){
      enabledPermissions.push(3);
    }
    if(this.supportEnabled){
      enabledPermissions.push(4);
    }
    this.emplService.updatePermissions(this.employeeInfo.employeeId, enabledPermissions)
                    .subscribe((resp:any) => {
                      this.employeeInfo = resp.data;
                      this.employeeName = this.employeeInfo.firstName + " " + this.employeeInfo.lastName;
                      this.activePermissions = this.employeeInfo.employeePermissions.length;
                      this.setPermissions();
                      alert("Permissions updated successfully");
                      this.loading = false;
                    },
                    (error:any) => {
                      alert("failed to update permissions");
                    });

  }

}
