import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  orgName = environment.orgName;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigateToLoginPage(){
    this.route.navigate(['/login']);
  }

}
