import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PosService } from '../../../shared/pos/pos.service';
import { AlertService } from '../../../shared/_alert';

@Component({
  selector: 'app-product-list',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  loading = false;
  isFilterCollapsed: boolean = true;
  posDataList: any[];
  selectedProductList: any[] = new Array();
  dateCondition = 'eq';
  filterDate: Date;

  // MatPaginator Inputs
  offset = 0;
  total = 10;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 50];
  // MatPaginator Output
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private alertService: AlertService, private posService: PosService){
  }

  ngOnInit(): void {
    this.getPosData(null, 0);
  }

  action(event:any){
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.getPosData(this.dateCondition, this.filterDate === undefined? 0 :new Date(this.filterDate).getTime());
  }

  getPosData(dateCondition: string, filterDate: number){
    this.loading = true;
    this.posService.getPOSData(this.pageSize, this.offset, dateCondition, filterDate)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.total = resp.data;
                        this.posDataList = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error:any) => {
                      this.alertService.error('Something went Wrong....try again later!');
                    });
  }

  setProductData(pos:any){
    this.selectedProductList.length = 0;
    let data: any[] = pos.posProduct;
    data.forEach(element => {
      this.selectedProductList.push(element);
    })
  }

  changeDateCondition(event){
    this.dateCondition = event.target.value;
  }

  fireDatefilter(){
    this.getPosData(this.dateCondition, new Date(this.filterDate).getTime());
  }

}
