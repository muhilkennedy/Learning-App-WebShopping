import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../../../shared/employee/employee.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  loading = false;

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

  constructor(private empService: EmployeeService) {
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
    this.loading = true;
    this.empService.createEmployee(this.firstName, this.lastName,
      this.email, this.mobile, this.designation, this.activeUser, this.dob, this.selectedGender,
      this.door, this.street, this.state, this.city, this.pincode)
        .subscribe(
          (resp:any) => {
            if(resp.statusCode === 200){
              alert("user creation successfull");
            }
            else{
              alert("user creation failed - " + resp.errorMessages);
            }
            this.loading = false;
          },
          (error:any) => {
            alert("user creation failed");
            this.loading = false;
          }
        );
  }


}
