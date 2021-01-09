import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

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

  // MatPaginator Inputs
  offset = 0;
  pageSize = 9;
  pageSizeOptions: number[] = [9, 15, 25];
  // MatPaginator Output
  pageEvent: PageEvent;

  action(event){
    this.loading = true;
    this.pageSize = event.pageSize;
    let pageIndex:number = event.pageIndex;
    this.offset = pageIndex * this.pageSize;
    this.setProducts(new Array(), null, null);
  }

  constructor(private productService: ProductService, private userStore: UserStoreService,
              private cartService: CartService) {

   }

  ngOnInit(): void {
    this.setProducts(new Array(), null, null);
    this.productService.getAllCategories()
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.categoryTree = this.buildFileTree(resp.data, 0);
                            this.dataSource.data = this.categoryTree;
                          }
                          else{
                            alert('Failed : ' + resp.errorMessages);
                          }
                          },
                          (error:any) => {
                            alert('Something went wrong!');
                          });
  }

  setProducts(cIds, sortField, SortType){
    this.loading = true;
    this.productService.getProducts(cIds, this.offset, this.pageSize, sortField, SortType)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.products.length = 0;
                            this.products = resp.dataList;
                          }
                          else{
                            alert('Failed : ' + resp.errorMessages);
                          }
                            this.loading = false;
                          },
                        (error:any) => {
                          alert('Something went wrong!');
                        });
    this.productService.getproductCount(cIds)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.productCount = resp.data.productCount;
                          }
                          else{
                            alert('Failed : ' + resp.errorMessages);
                          }
                        },
                        (error:any) => {
                          alert('Something went wrong!');
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
    this.setProducts(catId, null, null);
  }

  addToCart(prod){
    if(this.userStore.emailId === undefined || this.userStore.emailId === null){
      alert("Please Login to Add Items to Cart!");
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
                        }
                        this.productLoading = false;
                      },
                      (error: any) => {
                        alert("Something went wrong!");
                      })
    }
  }

}
