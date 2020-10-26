import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../shared/product/product.service';
import { AlertService } from '../../../../shared/_alert';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  loading = false;

  categoryId: string;
  pName: string;
  brand: string;
  cost: number;
  offer: number = 0;
  pDescription: string;
  productActive: boolean = true;
  fileToUpdate: File;
  productPic: string;
  searchCategory: string;
  pCode: string;
  unitsInStock : number;

  defaultAvatar = "assets/img/avatars/Blank-Profile.png";

  searchCatId: number;
    //autoComplete
    myControl = new FormControl('', [
      Validators.required
    ]);
    options: any[];
    filteredOptions: Observable<any[]>;

  constructor(private sanitizer: DomSanitizer, private productService: ProductService,
              private alertService: AlertService) {
    this.loading = true;
    this.productService.getCategoriesForTypeahead()
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.options = resp.dataList;
                            this.filteredOptions = this.myControl.valueChanges.pipe(
                              startWith(''),
                              map(value => this._filter(value))
                            );
                          }
                          else{
                            this.alertService.error('Failed : ' + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("something went wrong!");
                          this.loading = false;
                        });
  }

  private _filter(value: string): string[] {
    if(value === "")
    {
      return;
    }
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      (option.categoryName.toLowerCase().indexOf(filterValue) === 0 || (option.categoryId+"").toLowerCase().indexOf(filterValue) === 0));
  }

  ngOnInit(): void {
  }

  toggleProductActive(){
    this.productActive = !this.productActive;
  }

  handleFileUpdate(files: FileList) {
    this.productPic = URL.createObjectURL(files.item(0));
    if (this.isValidFile(files.item(0).name)) {
      this.fileToUpdate = files.item(0);
    }
    else{
      alert('Format not supported! Please upload jpeg/jpg/png file');
    }
  }

  isValidFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
        return true;
    }
    else {
        return false;
    }
  }

  checkImage(image){
    if(image === undefined || image === null){
      return this.defaultAvatar;
    }
    else{
      return this.sanitizer.bypassSecurityTrustUrl(image);;
    }
  }

  setCategory(cat: any){
    this.searchCatId = cat.categoryId;
    this.searchCategory = ""+this.searchCatId;
  }

  createProduct(){
    this.loading = true;
    this.productService.createOrUpdateProduct(this.fileToUpdate, this.searchCategory, null, this.pName,
                        this.brand, this.cost, this.offer, this.pDescription, this.productActive, this.pCode,
                        this.unitsInStock)
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.alertService.success('Product created succesfully');
                          }
                          else{
                            this.alertService.error('Failed : ' + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("something went wrong!");
                          this.loading = false;
                        });
  }

  getDiscountedPrice(): number{
    return (this.cost - (this.cost * this.offer)/100);
  }

  showFinalCost(): boolean{
    if(this.cost != undefined){
      return true;
    }
    return false;
  }

}
