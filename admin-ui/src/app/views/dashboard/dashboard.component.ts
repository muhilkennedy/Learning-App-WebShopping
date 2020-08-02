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

 constructor(private userStore: UserStoreService){

 }

  ngOnInit(): void {
    this.userPermissions = this.userStore.employeePermissions;
  }

}
