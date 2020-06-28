import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ui';

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http.get("http://localhost:8080/base/ping?Tenant-Id=devTenent01")
          .subscribe((response:any)=>{
            console.log("Connection to Backend successfull");
          },
          (error)=>{
            console.log("Connection to Backend Failed");
          })
  }
}
