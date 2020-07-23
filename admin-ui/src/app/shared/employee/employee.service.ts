import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  createEmployeeEndpoint = "/secure/admin/employee/createEmployee";
  allPermissionsEndpoint = "/secure/admin/employee/getAllPermissions";
  employeeEndpoint = "/secure/admin/employee/getEmployee";
  updatePermissionEndpoint = "/secure/admin/employee/overridePermissions";
  statusUpdateEndpoint = "/secure/admin/employee/activateEmployee";

  constructor(private http: HttpClient) { }

  createEmployee(firstName, lastName,
                email, mobile, designation, active, dob, selectedGender,
                door, street, state, city, pincode) : Observable<any>{
    const body = {
      emailId : email,
      firstName : firstName,
      lastName : lastName,
      designation : designation,
      dob : dob,
      gender : selectedGender,
      mobile : mobile,
      active: active,
      employeeAddress: [
          {
            doorNumber:door,
            street:street,
            city:city,
            state:state,
            pincode:pincode
          }
      ]
     };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.createEmployeeEndpoint, body, httpOptions);
  }

  getAllPermissions(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.allPermissionsEndpoint);
  }

  getEmployeeInfo(emailOrId: string): Observable<any>{
    const httpOptions = {
      params: {emailOrId: emailOrId}
    };
    return this.http.get(environment.backendBaseUrl+this.employeeEndpoint, httpOptions);
  }

  updatePermissions(employeeId:number, permissionIds: number[]): Observable<any>{
    const httpOptions = {
        employeeId: employeeId,
        permissions: permissionIds
    };
    return this.http.put(environment.backendBaseUrl+this.updatePermissionEndpoint, httpOptions);
  }

  changeEmployeeStatus(employeeId:number, status: boolean): Observable<any>{
    const httpOptions = {
      employeeId: employeeId,
      active: status
  };
  return this.http.put(environment.backendBaseUrl+this.statusUpdateEndpoint, httpOptions);
  }

}
