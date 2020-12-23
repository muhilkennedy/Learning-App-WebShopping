import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from '../../../shared/product/product.service';
import { AlertService } from '../../../shared/_alert';

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

  isFilterCollapsed: boolean = false;
  searchByProduts: boolean = false;
  moreFilters: boolean = false;

  loadActiveItemsOnly: boolean = true;
  outOfStock: boolean = false;

  sortField: string;
  sortType: string;

  toggleFilterCollapse(){
    this.isFilterCollapsed = !this.isFilterCollapsed;
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

   //autoComplete
  myControl = new FormControl('', [
    Validators.required
  ]);
  options: any[] = new Array();
  filteredOptions: Observable<any[]>;
  previousSearchTerm = '';

  constructor(private productService: ProductService, private alertService: AlertService,
              private fb: FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.filterloading = true;
    this.productService.getCategoriesForTypeahead()
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.categories = resp.dataList;
                          }
                          else{
                            this.alertService.error('Failed : ' + resp.errorMessages);
                          }
                          this.filterloading = false;
                        },
                        (error:any) => {
                          this.alertService.error('Something went wrong!');
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
                                    this.sortField, this.sortType, this.loadActiveItemsOnly, this.outOfStock)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.products = resp.dataList;
                          }
                          else{
                            this.alertService.error('Failed : ' + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error('Something went wrong!');
                        });
  }

  setProductCount(){
    this.productService.getproductCount(this.cIds)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.totalRecords = resp.data.productCount;
                        }
                        else{
                          this.alertService.error('Failed : ' + resp.errorMessages);
                        }
                      },
                      (error:any) => {
                        this.alertService.error('Something went wrong');
                      });
  }

  loadActiveItems(){
    this.setProducts();
  }

  loadOutOfStockItems(){
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
                            this.alertService.error('Failed : ' + resp.errorMessages);
                          }
                        },
                        (error:any) => {
                          this.alertService.error('Something went wrong');
                        });
  }

  getProducts(event: any){
    let searchTerm = '';
    searchTerm += event.target.value;
    console.log(searchTerm);
    this.getProductFromMatchingText(searchTerm);
  }

  getProductFromMatchingText(searchTerm){
    if (searchTerm.length > 3 && this.previousSearchTerm !== searchTerm) {
      this.productService.getProductByMatchingNameOrCode(searchTerm)
                          .subscribe((resp:any) => {
                            if(resp.statusCode  === 200){
                              this.products = resp.dataList;
                              this.options = resp.dataList;
                              this.filteredOptions = this.myControl.valueChanges.pipe(
                                startWith(''),
                                map(value => this._filter(value))
                              );
                            }
                            else{
                              this.alertService.error('Failed : ' + resp.errorMessages);
                            }
                            this.previousSearchTerm = searchTerm;
                            this.loading = false;
                          },
                          (error:any) => {
                            this.alertService.error("something went wrong!");
                            this.loading = false;
                          });
                        }
  }

  private _filter(value: string): string[] {
    if(value === undefined || value === "")
    {
      return;
    }
    const filterValue = value.toLowerCase();
    return this.options.filter(option => (option.productName.toLowerCase().indexOf(filterValue) === 0 ||
                                          option.productCode.toLowerCase().indexOf(filterValue) === 0));
  }

}
