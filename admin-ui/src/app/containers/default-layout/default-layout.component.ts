import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { UserStoreService } from '../../service/userStore/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public profilePic = "assets/img/avatars/Blank-Profile.jpg";

  constructor(public userStore: UserStoreService){
    if(this.userStore.profilePic != null){
      this.profilePic = this.userStore.profilePic;
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
