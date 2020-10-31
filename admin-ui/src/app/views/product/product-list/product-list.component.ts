import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  loading = false;
  filterloading = false;
  products:any[] = new Array();
  categories:any[] = new Array();
  pIds:any[] = new Array();
  cIds:any[] = new Array();

  isCollapsed: boolean = false;
  searchByProduts: boolean = false;

  loadActiveItemsOnly: boolean = true;

  sortField: string;
  sortType: string;

  toggleFilterCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }

   // MatPaginator Inputs
   offset = 0;
   totalRecords = 100;
   pageSize = 25;
   pageSizeOptions: number[] = [25, 50, 75];
   // MatPaginator Output
   pageEvent: PageEvent;

  myForm:FormGroup;
        disabled = false;
        ShowFilter = false;
        limitSelection = false;
        selectedItems: any = [];
        dropdownSettings: any = {};

  constructor(private productService: ProductService, private fb: FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.filterloading = true;
    this.productService.getCategoriesForTypeahead()
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.categories = resp.dataList;
                          }
                          else{
                            alert("failed")
                          }
                          this.filterloading = false;
                        },
                        (error:any) => {
                          alert("error");
                        });

    this.setProducts();

    this.dropdownSettings = {
        singleSelection: false,
        idField: 'categoryId',
        textField: 'categoryName',
        selectAllText: 'Select All Category',
        unSelectAllText: 'UnSelect All Category',
        itemsShowLimit: 2,
        allowSearchFilter: true
    };
    this.myForm = this.fb.group({
        category: [this.selectedItems]
    });
  }

  setProducts(){
    this.loading = true;
    this.setProductCount();
    this.productService.getProducts(this.pIds, this.cIds, this.offset, this.pageSize,
                                    this.sortField, this.sortType, this.loadActiveItemsOnly)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.products = resp.dataList;
                          }
                          else{
                            alert("failed")
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          alert("error");
                        });
  }

  setProductCount(){
    this.productService.getproductCount(this.cIds)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.totalRecords = resp.data.productCount;
                        }
                        else{
                          alert("failed")
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  loadActiveItems(){
    this.setProducts();
  }

  sortBy(sortField:string, sortType: string){
    this.sortType = sortType;
    this.sortField = sortField;
    this.setProducts();
  }

  clearSort(){
    this.sortType = null;
    this.sortField = null;
    this.setProducts();
  }

  onItemSelect(item: any) {
      if(!this.cIds.includes(item.categoryId)){
        this.cIds.push(item.categoryId);
      }
      this.setProducts();
  }
  onDeSelect(item: any){
    if(this.cIds.includes(item.categoryId)){
      let index = this.cIds.indexOf(item.categoryId);
      this.cIds.splice(index, 1);
    }
    this.setProducts();
  }
  onDeSelectAll(){
    this.cIds.length = 0;
    this.setProducts();
  }
  onSelectAll(items: any) {
      console.log('onSelectAll', items);
      items.forEach(item => {
        if(!this.cIds.includes(item.categoryId)){
          this.cIds.push(item.categoryId);
        }
      });
      this.setProducts();
  }
  toogleShowFilter() {
      this.ShowFilter = !this.ShowFilter;
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
      if (this.limitSelection) {
          this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
      } else {
          this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
      }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  action(event){
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.setProducts();
  }

  editProduct(productId){
    this.route.navigate(['product/edit-product', productId]);
  }

  toggleProductActive(product){
    this.productService.toggleProductStatus(product.productId, !product.active)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.setProducts();
                          }
                          else{
                            alert("failed")
                          }
                        },
                        (error:any) => {
                          alert("error");
                        });
  }

}
