import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  public profilePic = "assets/img/avatars/Blank-Profile.jpg";

  constructor(public userStore: UserStoreService, private router: Router){

    if(this.userStore.profilePic != null){
      this.profilePic = this.userStore.profilePic;
    }

    navItems.forEach(item =>{
      console.log("item - ", item);
      //filter menu based on permissions!(ER)
    });
  }
  ngOnInit(): void {
    if(this.userStore==undefined || this.userStore.userId == undefined){
      this.router.navigate(['/login']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
