import { Component, HostListener, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from "@angular/core";
import { AlertService } from '../../shared/_alert';
import { InvoiceService } from '../../shared/invoice/invoice.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'invoice-template.component.html',
  styleUrls: ['invoice-template.component.scss']
})
export class InvoiceTemplateComponent implements OnInit {

  loading: boolean  = false;
  documentLoading: boolean = true;
  fileToUpdate: File;
  pdfSrc: string;
  downloadURl;

  constructor(private alertService: AlertService, private invoiceService: InvoiceService,
    private sanitizer: DomSanitizer){

  }

  ngOnInit(){
    this.getActiveTemplatePDF();
    this.prepareDownloadFile();
  }

  handleFileUpdate(files: FileList) {
    if (this.isValidFile(files.item(0).name)) {
      this.fileToUpdate = files.item(0);
    }
    else{
      this.alertService.error('Format not supported! Please upload doc/docx file');
    }
  }

  isValidFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx') {
        return true;
    }
    else {
        return false;
    }
  }

  uploadFile(){
    this.loading = true;
    this.invoiceService.uploadTemplate(this.fileToUpdate)
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            this.alertService.success("Template Uploaded Successfully!");
                            this.getActiveTemplatePDF();
                            this.prepareDownloadFile();
                          }
                          else{
                            this.alertService.error("Failed to upload template : " + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error) => {
                          this.alertService.error("Something went wrong!", error)
                          this.loading = false;
                      });

  }

  getActiveTemplatePDF(){
    this.documentLoading = true;
    this.invoiceService.getTemplate()
                        .subscribe((resp: any) => {
                          if(resp.statusCode != undefined && resp.statusCode === 204){
                            this.alertService.warn("No Active template Found! Please upload a Invoice Template");
                          }
                          else{
                            let file = new Blob([resp], { type: 'application/vnd.openxmlformats' });
                            var fileURL = URL.createObjectURL(file);
                            this.pdfSrc = fileURL;
                          }
                          this.documentLoading = false;
                        },
                        (error) => {
                          this.alertService.error("Something went wrong!", error)
                          this.documentLoading = false;
                      });
  }

  prepareDownloadFile(){
    this.invoiceService.getTemplateDocument()
                        .subscribe((resp: any) => {
                          if(resp.statusCode != undefined && resp.statusCode === 204){
                            this.alertService.warn("No Active template Found! Please upload a Invoice Template");
                          }
                          else{
                            const blob = new Blob([resp], { type: 'application/octet-stream' });
                            this.downloadURl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));}
                        },
                        (error) => {
                          this.alertService.error("Something went wrong!", error)
                      });
  }

}
