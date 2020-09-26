import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../../../../shared/product/product.service';

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
  offer: number;
  pDescription: string;
  productActive: boolean = true;
  fileToUpdate: File;
  productPic: string;

  defaultAvatar = "assets/img/avatars/Blank-Profile.png";

  constructor(private sanitizer: DomSanitizer, private productService: ProductService) { }

  ngOnInit(): void {
  }

  toggleProductActive(){
    this.productActive = !this.productActive;
  }

  handleFileUpdate(files: FileList) {
    this.productPic = URL.createObjectURL(files.item(0));
    this.fileToUpdate = files.item(0);
  }

  checkImage(image){
    if(image === undefined || image === null){
      return this.defaultAvatar;
    }
    else{
      return this.sanitizer.bypassSecurityTrustUrl(image);;
    }
  }

}
