import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UserStoreService } from '../../service/userStore/user-store.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

 showAdminCard: boolean = false;
 public userPermissions: any[];
 public date: Date = new Date();

 constructor(private userStore: UserStoreService){

 }

  ngOnInit(): void {
    let onLoad = setInterval(() => {
      this.userPermissions = this.userStore.employeePermissions;
      if(this.userPermissions != undefined && this.userPermissions.length > 0){
        let permissionIds = new Array(4);
        this.userPermissions.forEach(permission => {
          permissionIds.push(permission.permission.permissionId);
        });
        if(permissionIds.includes(1)){
          this.showAdminCard = true;
        }

        clearInterval(onLoad);
      }
    }, 500);

  }

}
