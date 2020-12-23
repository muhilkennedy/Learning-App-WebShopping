import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SatesAndCityService } from './satesandcity.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  createEmployeeEndpoint = "/secure/admin/employee/createEmployee";
  allPermissionsEndpoint = "/secure/admin/employee/getAllPermissions";
  employeeEndpoint = "/secure/admin/employee/getEmployee";
  allEmployeeEndpoint = "/secure/admin/employee/getAllEmployee";
  allEmployeeCountEndpoint = "/secure/admin/employee/getAllEmployeesCount";
  updatePermissionEndpoint = "/secure/admin/employee/overridePermissions";
  statusUpdateEndpoint = "/secure/admin/employee/activateEmployee";
  getEmployeesByIdEndPoint = "/secure/admin/employee/getEmployeesById";
  getAllEmployeeNamesAndEmailEndpoint = "/secure/admin/employee/getAllEmployeeNames";
  toggleOrderPickUpEndpoint = "/secure/admin/employee/toggleOrderPickUp";

  getCustomerByIdEndpoint = "/secure/admin/employee/getCustomerById";
  getCustomerByMobileEndpoint = "/secure/admin/employee/getCustomerByMobile";

  constructor(private http: HttpClient, public stateAndCityService: SatesAndCityService) { }

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

  toggleOrderPickup(): Observable<any>{
    return this.http.put(environment.backendBaseUrl+this.toggleOrderPickUpEndpoint, null);
  }

  changeEmployeeStatus(employeeId:number, status: boolean): Observable<any>{
    const httpOptions = {
      employeeId: employeeId,
      active: status
    };
    return this.http.put(environment.backendBaseUrl+this.statusUpdateEndpoint, httpOptions);
  }

  getAllEmployees(offset, limit): Observable<any>{

    //Set Headers
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Offset', offset)
    .append('Limit', limit);

    const httpOptions = {
      headers: requestHeaders
    };

    return this.http.get(environment.backendBaseUrl+this.allEmployeeEndpoint, httpOptions);
  }

  getEmployeesById(ids){
    const httpOptions = {
      params: {ids: ids}
    };
    return this.http.get(environment.backendBaseUrl+this.getEmployeesByIdEndPoint, httpOptions);
  }

  getAllEmployeesCount(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.allEmployeeCountEndpoint);
  }

  getAllEmployeeNamesAndEmail(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getAllEmployeeNamesAndEmailEndpoint);
  }

  getCustomerById(customerId){
    const httpOptions = {
      params: {id: customerId}
    };
    return this.http.get(environment.backendBaseUrl+this.getCustomerByIdEndpoint, httpOptions);
  }

  getCustomerByMobile(mobile){
    const httpOptions = {
      params: {mobile: mobile}
    };
    return this.http.get(environment.backendBaseUrl+this.getCustomerByMobileEndpoint, httpOptions);
  }

}
