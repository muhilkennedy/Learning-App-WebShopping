import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  searchText:string;

  constructor(private router: Router, public commonsService: CommonsService) { }

  ngOnInit(): void {
  }

  searchAction(){
    this.commonsService.searchText = this.searchText;
    this.router.navigate(['/productList'], { queryParams: { searchText: this.searchText } })
  }

}
