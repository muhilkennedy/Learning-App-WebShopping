import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../../../shared/employee/employee.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Alert, AlertService } from '../../../shared/_alert';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  loading = false;
  alertoptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  activeUser:boolean;
  selectedGender = 'male';
  firstName:string;
  lastName:string;
  email:string;
  mobile:string;
  designation:string;
  door: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  dob: Date;
  genders = ['male', 'female'];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  fnameFormControl = new FormControl('', [
    Validators.required
  ]);

  lnameFormControl = new FormControl('', [
    Validators.required
  ]);

  mobileFormControl = new FormControl('', [
    Validators.required,
    Validators.min(999999999),
    Validators.max(9999999999)
  ]);

  designationFormControl = new FormControl('', [
    Validators.required
  ]);

  doorFormControl = new FormControl('', [
    Validators.required
  ]);

  streetFormControl = new FormControl('', [
    Validators.required
  ]);

  cityFormControl = new FormControl('', [
    Validators.required
  ]);

  stateFormControl = new FormControl('', [
    Validators.required
  ]);

  pinFormControl = new FormControl('', [
    Validators.required
  ]);

  dobFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private empService: EmployeeService,
              private alertService: AlertService) {
    this.activeUser = true;
  }

  ngOnInit(): void {
  }

  slidetoggle(){
    this.activeUser = !this.activeUser;
  }

  setDob(type: string, event: MatDatepickerInputEvent<Date>){
    this.dob = event.value;
  }

  onboard(){
    let hasError = false;
    if(this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')){
      this.alertService.warn('Email Field has Errors', this.alertoptions);
      hasError = true;
    }
    if(this.fnameFormControl.hasError('required')){
      this.alertService.warn('First Name is Required', this.alertoptions);
      hasError = true;
    }
    if(this.lnameFormControl.hasError('required')){
      this.alertService.warn('Last Name is Required', this.alertoptions);
      hasError = true;
    }
    if(this.mobileFormControl.hasError('required')){
      this.alertService.warn('Mobile Number is Required', this.alertoptions);
      hasError = true;
    }
    if(this.designationFormControl.hasError('required')){
      this.alertService.warn('Designation is Required', this.alertoptions);
      hasError = true;
    }
    if(this.doorFormControl.hasError('required')){
      this.alertService.warn('Door Number is Required', this.alertoptions);
      hasError = true;
    }
    if(this.streetFormControl.hasError('required')){
      this.alertService.warn('Street Name is Required', this.alertoptions);
      hasError = true;
    }
    if(this.cityFormControl.hasError('required')){
      this.alertService.warn('City Name is Required', this.alertoptions);
      hasError = true;
    }
    if(this.stateFormControl.hasError('required')){
      this.alertService.warn('State Name is Required', this.alertoptions);
      hasError = true;
    }
    if(this.pinFormControl.hasError('required')){
      this.alertService.warn('PIN Code is Required', this.alertoptions);
      hasError = true;
    }
    if(this.dobFormControl.hasError('required')){
      this.alertService.warn('DateOfBirth is Required', this.alertoptions);
      hasError = true;
    }
    if(!hasError){
      this.alertService.clear();
      this.loading = true;
      this.empService.createEmployee(this.firstName, this.lastName,
        this.email, this.mobile, this.designation, this.activeUser, this.dob, this.selectedGender,
        this.door, this.street, this.state, this.city, this.pincode)
          .subscribe(
            (resp:any) => {
              if(resp.statusCode === 200){
                this.alertService.success('Employee Onboarded Successfully !', this.alertoptions);
                this.alertService.info('An onboarding email has been sent. Please assign permissions', this.alertoptions);
              }
              else{
                this.alertService.error("Employee Creation Failed - " + resp.errorMessages);
              }
              this.loading = false;
            },
            (error:any) => {
              this.alertService.error("Something went wrong.... Try again Later");
              this.loading = false;
            }
          );
    }
  }


}
