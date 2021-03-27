import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from '../../../shared/product/product.service';
import { AlertService } from '../../../shared/_alert';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  paramSubscription: Subscription;
  productId:number;

  loading = false;
  imageLoading = false;

  categoryId: string;
  pName: string;
  brand: string;
  cost: number;
  offer: number = 0;
  sellingCost: number ;
  pDescription: string = '';
  productActive: boolean = true;
  fileToUpdate: File;
  productPic: string;
  searchCategory: string;
  pCode: string;
  unitsInStock : number;
  featuredProduct : boolean = false;

  sliderImages:any = new Array();
  isUploadCollapsed: boolean = true;
  isEditCardCollapsed: boolean = false;
  isImageCardCollapsed: boolean = true;

  alertoptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private productService: ProductService,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
    this.productService.getProductsByIds(this.productId)
                       .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.setProductData(resp);
                          }
                       },
                       (error:any)=>{
                         this.alertService.error("Something went Wrong! " + error);
                       })
    this.setSliderImages();
    this.isFeaturedProduct();
  }

  setProductData(resp:any){
    this.categoryId = resp.dataList[0].categoryId.categoryId;
    this.pName = resp.dataList[0].productName;
    this.brand = resp.dataList[0].brandName;
    this.cost = resp.dataList[0].cost;
    this.offer = resp.dataList[0].offer;
    this.pDescription = resp.dataList[0].productDescription;
    this.productActive = resp.dataList[0].active;
    this.unitsInStock = resp.dataList[0].quantityInStock;
    this.pCode = resp.dataList[0].productCode;
    this.productId = resp.dataList[0].productId;
    this.sellingCost = resp.dataList[0].sellingCost;
  }

  toggleFeaturedProduct(){
    this.loading = true;
    if(this.featuredProduct){
      this.productService.deleteFeaturedProduct(this.productId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.featuredProduct = false;
                          }
                          else{
                            this.featuredProduct = true;
                          }
                          this.loading = false;
                        },
                        (error:any)=>{
                          this.alertService.error("Something went Wrong! " + error);
                          this.featuredProduct = true;
                        })
    }
    else{
      this.productService.addFeatureProduct(this.productId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.featuredProduct = true;
                          }
                          else{
                            this.featuredProduct = false;
                          }
                          this.loading = false;
                        },
                        (error:any)=>{
                          this.alertService.error("Something went Wrong! " + error);
                          this.featuredProduct = false;
                        })
    }

  }

  isFeaturedProduct(){
    this.productService.isFeaturedProduct(this.productId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.featuredProduct = true;
                          }
                          else{
                            this.featuredProduct = false;
                          }
                        },
                        (error:any)=>{
                          this.alertService.error("Something went Wrong! " + error);
                        })
  }

  setSliderImages(){
    this.productService.getProductImages(this.productId)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.sliderImages.length = 0;
                          resp.dataList.forEach(element => {
                            this.sliderImages.push(element);
                          })
                        }
                    },
                    (error:any)=>{
                      this.alertService.error("Something went Wrong! " + error);
                    })
  }

  toggleProductActive(){
    this.productActive = !this.productActive;
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

  updateProduct(){
    this.loading = true;
    this.productService.createOrUpdateProduct(null, this.categoryId, this.productId, this.pName,
                        this.brand, this.cost, this.offer, this.pDescription, this.productActive, this.pCode,
                        this.unitsInStock, this.sellingCost)
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.alertService.success('Product updated succesfully', this.alertService);
                            this.alertService.info('Please note a new product will be created for every update and the previous version will be deactivated!', this.alertService);
                            this.setProductData(resp);
                            this.featuredProduct = false;
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

  cloneProduct(){
    this.loading = true;
    this.productService.cloneProduct(this.productId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.alertService.success('New Product Cloned Successfully !', this.alertService);
                            this.setProductData(resp);
                            this.featuredProduct = false;
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

  deleteProduct(){
    this.loading = true;
    this.productService.deleteProduct(this.productId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.alertService.info('Product Deleted Successfully !', this.alertService);
                            this.featuredProduct = false;
                            this.router.navigate(['/product/product-list']);
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

  isValidFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
        return true;
    }
    else {
        return false;
    }
  }

  defaultAvatar = "assets/img/avatars/Blank-Profile.png";

  checkImage(image){
    if(image === undefined || image === null){
      return this.defaultAvatar;
    }
    else{
      return this.sanitizer.bypassSecurityTrustUrl(image);;
    }
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

  uploadImage(){
    this.productService.uploadProductImage(this.productId, this.fileToUpdate)
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.alertService.success('Product Image Uploaded succesfully', this.alertService);
                            this.setSliderImages();
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

  deleteImage(imageId){
    this.productService.removeProductImage(imageId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.alertService.warn('Product Image removed succesfully', this.alertService);
                            this.setSliderImages();
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

  onSellingCostKeyUp(event){
    let cost = this.cost - this.sellingCost;
    let percentageDecrease = (cost/this.cost)*100;
    this.offer = Math.round(percentageDecrease);
  }

}
