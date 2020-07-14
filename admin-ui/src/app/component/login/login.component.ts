import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private router: Router){

  }

  login(){
    if(this.email==='superuser' && this.password==='superuser'){
      this.router.navigate(['/dashboard']);
    }
    else{
      alert("login error");
    }

  }

 }
