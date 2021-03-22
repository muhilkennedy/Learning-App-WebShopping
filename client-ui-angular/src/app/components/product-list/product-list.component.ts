import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeatureService } from 'src/app/service/feature/feature.service';
import {MatPaginator} from '@angular/material/paginator';

export class ItemNode {
  children: ItemNode[];
  item: string;
  catId: number;
  catName: string;
}

/** Flat category item node with expandable and level information */
export class ItemFlatNode {
  item: string;
  catId: number;
  catName: string;
  level: number;
  expandable: boolean;
}

const TREE_DATA: ItemNode[] = []

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  isCatCollapsed: boolean = false;
  isFilterCollapsed: boolean = false;

  private _transformer = (node: ItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      catName: node.catName,
      catId: node.catId,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ItemFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ItemFlatNode) => node.expandable;

  loading = false;
  productLoading = false;

  productCount:number = 0;
  products:any[] = new Array();
  categoryTree:any[] = new Array();
  selectedCategoryId: any;

  productDetailsPage = "ProductDetailsPage";

  // MatPaginator Inputs
  offset = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25];
  // MatPaginator Output
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  action(event){
    this.loading = true;
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    if(this.productSearched !== undefined && this.productSearched !== null && this.productSearched !== ''){
      this.nextAction();
    }
    else{
      if(this.selectedCategoryId !== undefined && this.selectedCategoryId > -1){
        this.setProducts(this.selectedCategoryId, null, null);
      }
      else{
        this.setProducts(new Array(), null, null);
      }
    }
    window.scroll(0,0);
  }

  //autoComplete
  myControl = new FormControl('', [ ]);
  options: any[] = new Array();
  filteredOptions: Observable<any[]>;
  productSearched: string;
  previousSearchTerm = '';
  getProductsForSearch(event: any){
    let searchTerm = '';
    searchTerm += event.target.value;
    console.log(searchTerm);
    if(searchTerm.length > 3 && searchTerm.length < 5){
      this.getProductFromMatchingText(searchTerm, null, null);
    }
  }

  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.isMobileView()){
      this.isCatCollapsed = true;
      this.isFilterCollapsed = true;
    }
    else{
      this.isCatCollapsed = false;
      this.isFilterCollapsed = false;
    }
  }

  constructor(private productService: ProductService, private userStore: UserStoreService,
              private cartService: CartService, private router: Router,
              private commonService: CommonsService, private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar, private featureService: FeatureService ) {

  }

  isMobileView(){
    if(this.innerWidth < 600){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit(): void {
    this.onResize("event");
    if(this.isMobileView()){
      this.pageSizeOptions.length = 0;
      this.pageSizeOptions = [10, 20, 50];
    }
    else{
      this.pageSizeOptions.length = 0;
      this.pageSizeOptions = [9, 18, 36];
    }
    this.activatedRoute.queryParams.subscribe(queryParams => {
      let searchText=queryParams.searchText;
      if(searchText !== undefined && searchText !== null && searchText !== ''
        && searchText !== "null" && this.commonService.searchText === searchText){
          // this.pageSize = 100;
          this.productSearched = searchText;
          this.searchAction();
          this.commonService.searchText = null;
      }
      else{
        this.pageSize = this.pageSizeOptions[0];
        this.setProducts(new Array(), null, null);
      }
    });

    if(this.commonService.categories === undefined || this.commonService.categories === null){
      this.productService.getAllCategories()
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.commonService.categories = resp.data;
                            this.categoryTree = this.buildFileTree(resp.data, 0);
                            this.dataSource.data = this.categoryTree;
                          }
                          else{
                            this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          }
                          },
                          (error:any) => {
                            this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        });
    }
    else{
      this.categoryTree = this.buildFileTree(this.commonService.categories, 0);
      this.dataSource.data = this.categoryTree;
    }

    /*this.featureService.getFeatureStatus(this.productDetailsPage)
                            .subscribe((resp:any) => {
                              if(resp.statusCode === 200){
                                this.productDetailsPage = resp.data.featureStatus;
                              }
                            },
                            (error:any) => {
                              this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                            });*/
  }

  setProducts(cIds, sortField, SortType){
    this.loading = true;
    this.productService.getProducts(cIds, this.offset, this.pageSize, sortField, SortType)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.products.length = 0;
                            this.products = resp.dataList;
                            if(this.isMobileView()){
                              this.isCatCollapsed = true;
                            }
                          }
                          else{
                            this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          }
                            this.loading = false;
                          },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        });
    this.productService.getproductCount(cIds)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.productCount = resp.data.productCount;
                          }
                          else{
                            this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          }
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        });
}

  getProductImage(prod){
    return (prod.productImage !== undefined && prod.productImage !== null && prod.productImage.length > 0)?
            prod.productImage[0].image : null
  }

  calculateDiscountedPrice(product){
    return (product.cost - ((product.cost * product.offer) / 100));
  }

  hasChildren(category:any):boolean{
    if(category.children !== undefined && category.children.length > 0){
      return true;
    }
    return false;
  }

  buildFileTree(obj: {[key: string]: any}, level: number): ItemNode[] {
    return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ItemNode();
      node.item = key;
      node.catId = parseInt(key.split(",")[0]);
      node.catName = key.split(",")[1];
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
          node.catId = parseInt(key.split(",")[0]);
          node.catName = key.split(",")[1];
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  getProducts(catId){
    if(this.selectedCategoryId !== catId){
      this.offset = 0;
      this.paginator.pageIndex = 0;
    }
    this.setProducts(catId, null, null);
    this.selectedCategoryId = catId;
    this.productSearched = "";
    window.scroll(0,0);
  }

  addToCart(prod){
    if(this.userStore.emailId === undefined || this.userStore.emailId === null){
      this._snackBar.open('Please login to Add to Cart !', 'OK', this.commonService.alertoptionsError);
      // this.router.navigate(['/login']);
    }
    else{
      this.productLoading = true;
      this.cartService.addProducToCart(prod.productId)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          if(this.userStore.cartCount === undefined){
                            this.userStore.cartCount = 0;
                          }
                          this.userStore.cartCount++;
                          this._snackBar.open('Added To cart Successfully', '', this.commonService.alertoptionsSuccess);
                        }
                        this.productLoading = false;
                      },
                      (error: any) => {
                        this._snackBar.open('Failed to Add in Cart!', '', this.commonService.alertoptionsError);
                      })
    }
  }

  getProductFromMatchingText(searchTerm, sortField, sortType){
      this.loading = true;
      this.productService.getProductsBySearchTerm(null , searchTerm, this.pageSize, this.offset, sortField, sortType)
                          .subscribe((resp:any) => {
                            if(resp.statusCode  === 200){
                              this.products.length = 0;
                              this.productCount = resp.data;
                              this.products = resp.dataList;
                            }
                            else{
                              alert('Failed : ' + resp.errorMessages);
                            }
                            this.loading = false;
                          },
                          (error:any) => {
                            this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                            this.loading = false;
                          });
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

  selectProduct(){

  }

  searchAction(){
    this.pageSize = 10;
    this.offset = 0;
    this.getProductFromMatchingText(this.productSearched, null, null);
  }

  nextAction(){
    this.getProductFromMatchingText(this.productSearched, null, null);
  }

  searchActionFilter(sortField: string, sortType: string){
    this.pageSize = 10;
    this.offset = 0;
    this.getProductFromMatchingText(this.productSearched, sortField, sortType);
  }

  sortBy(sortField: string, sortType: string){
    if(this.productSearched !== undefined && this.productSearched !== null && this.productSearched !== ''){
      if(sortField != null && sortField !== undefined){
        this.searchActionFilter(sortField, sortType);
      }
      else{
        this.searchAction();
      }
    }
    else{
      this.setProducts(this.selectedCategoryId, sortField, sortType);
    }
  }

  clearSort(){
      this.setProducts(this.selectedCategoryId, null, null);
  }

  viewDetailPage(product){
    this.commonService.selectedProduct = product;
    //comented this check as dev is completed
    //if(this.productDetailsPage){
    this.router.navigate(['/productDetail'], { queryParams: { productId: product.productId }});
    // }
  }
}
