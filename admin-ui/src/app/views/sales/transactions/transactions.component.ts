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
    this.getPosData();
  }

  action(event:any){
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.getPosData();
  }

  getPosData(){
    this.loading = true;
    this.posService.getPOSData(this.pageSize, this.offset)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
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

}
