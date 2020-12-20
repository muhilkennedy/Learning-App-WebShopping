import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../../../shared/employee/employee.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Alert, AlertService } from '../../../shared/_alert';
import { Observable } from 'rxjs';
import { SatesAndCityService } from '../../../shared/employee/satesandcity.service';
import { map, startWith } from 'rxjs/operators';

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

  //autoComplete
  stateControl = new FormControl('', [
    Validators.required
  ]);
  stateOptions: any[];
  filteredStateOptions: Observable<any[]>;
  setState(state){
    this.state = state;
    let index = this.stateOptions.indexOf(state);
    let cityString = this.cityStateService.s_a[index+1];
    let cities:[] = cityString.split("|");
    this.cityOptions.length = 0;
    this.cityOptions = cities;
  }

  cityControl = new FormControl('', [
    Validators.required
  ]);
  cityOptions: any[] = new Array();
  filteredCityOptions: Observable<any[]>;
  setCity(city){
    this.city = city.trim();
  }

  constructor(private empService: EmployeeService,
              private alertService: AlertService,
              private cityStateService: SatesAndCityService) {
    this.stateOptions = cityStateService.state_arr;
    this.cityOptions = cityStateService.s_a[0].split("|");
    this.activeUser = true;
  }

  ngOnInit(): void {
    this.filteredStateOptions = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterState(value))
    );
    this.filteredCityOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCity(value))
    );
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().indexOf(" "+filterValue) === 0);
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
    if(this.cityControl.hasError('required')){
      this.alertService.warn('City Name is Required', this.alertoptions);
      hasError = true;
    }
    if(this.stateControl.hasError('required')){
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
