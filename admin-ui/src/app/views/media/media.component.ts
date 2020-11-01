import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../shared/media/media.service';
import { ProductService } from '../../shared/product/product.service';
import { AlertService } from '../../shared/_alert';

@Component({
  templateUrl: 'media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  loading = false;
  alertoptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  sliderImages:any = new Array();
  homeImages:any = new Array();

  isSliderImagesCollapsed: boolean = true;
  isHomeImagesCollapased: boolean = true;
  isFeaturedProductsCollapsed: boolean = true;

  fileToUpdate: File = null;
  fileToAdd: File = null;

  mediaId: number;
  title: string;
  description: string;
  message: string;
  isShopNow: boolean;
  isContact: boolean;

  selectedValue = "";

  changeSlected(event){
    this.selectedValue = event.target.value;
    if(this.selectedValue === 'none'){
      this.isShopNow = false;
      this.isContact = false;
    }
    if(this.selectedValue === 'shop'){
      this.isShopNow = true;
      this.isContact = false;
    }
    if(this.selectedValue === 'contact'){
      this.isShopNow = false;
      this.isContact = true;
    }
  }

  sliderActions: string[] = ['Update', 'Create'];
  sliderAction = this.sliderActions[0];
  homeMediaAction = this.sliderActions[0];

  constructor(private mediaService: MediaService,
              private alertService: AlertService,
              private productService: ProductService){

  }

  ngOnInit(): void {
    this.refreshImages();
  }

  refreshImages(){
    this.loading = true;
    this.sliderImages.length = 0;
    this.homeImages.length = 0;
    this.mediaService.getAllImages()
                     .subscribe((resp:any) => {
                        resp.dataList.forEach(element => {
                          if(element.sliderShow){
                            this.sliderImages.push(element);
                          }
                          else{
                            this.homeImages.push(element);
                          }
                        });
                        this.loading = false;
                     },
                     (error) => {
                        this.alertService.error('Something went wrong!' , this.alertoptions);
                     });
  }

  handleFileUpdate(files: FileList) {
    this.fileToUpdate = files.item(0);
  }

  handleFileAdd(files: FileList){
    this.fileToAdd = files.item(0);
  }

  removeImage(mediaId){
    this.mediaService.deleteImage(mediaId)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.refreshImages();
                        }
                        else{
                          this.alertService.error('Failed - ' + resp.errorMessages , this.alertoptions);
                        }
                      },
                      (error) => {
                        this.alertService.error('Something went wrong!' , this.alertoptions);
                      });
  }

  updateSliderImage(mediaId){
    this.mediaService.updateImage(this.fileToUpdate, mediaId, true, false, false, this.title, this.description, this.message)
                     .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.refreshImages();
                      }
                      else{
                        this.alertService.error('Failed - ' + resp.errorMessages , this.alertoptions);
                      }
                     },
                     (error) => {
                      this.alertService.error('Something went wrong!' , this.alertoptions);
                     });
  }

  updateHomeImage(mediaId){
    this.loading = true;
    this.mediaService.updateImage(this.fileToAdd, mediaId, false, this.isShopNow, this.isContact, this.title, this.description, this.message)
                     .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.refreshImages();
                      }
                      else{
                        this.alertService.error('Failed - ' + resp.errorMessages , this.alertoptions);
                      }
                     },
                     (error) => {
                      this.alertService.error('Something went wrong!' , this.alertoptions);
                     });
  }

  addImageToSlider(){
    this.mediaService.addImage(this.fileToAdd, true, false, false, this.title, this.description, this.message)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200)
                        {
                          this.refreshImages();
                        }
                        else
                        {
                          this.alertService.error('Failed - ' + resp.errorMessages , this.alertoptions);
                        }
                      },
                      (error)=>{
                        this.alertService.error('Something went wrong!' , this.alertoptions);
                      });
  }

  addImageToHome(){
    this.mediaService.addImage(this.fileToAdd, false, this.isShopNow, this.isContact, this.title, this.description, this.message)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200)
                        {
                          this.refreshImages();
                        }
                        else
                        {
                          this.alertService.error('Failed - ' + resp.errorMessages , this.alertoptions);
                        }
                      },
                      (error)=>{
                        this.alertService.error('Something went wrong!' , this.alertoptions);
                      });
  }

  showSliderUpdate(): boolean{
    if(this.sliderAction === this.sliderActions[0]){
      return true;
    }
    else{
      return false;
    }
  }

  showHomeUpdate(): boolean{
    if(this.homeMediaAction === this.sliderActions[0]){
      return true;
    }
    else{
      return false;
    }
  }

}
