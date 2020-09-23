import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  loading = false;
  products:any[] = new Array();
  pIds:any[] = new Array();
  cIds:any[] = new Array();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts(this.pIds, this.cIds, 10, 0)
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

}
