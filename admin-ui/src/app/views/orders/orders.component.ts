import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/_alert';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
import { OrdersService } from '../../shared/orders/orders.service';
import { EmployeeService } from '../../shared/employee/employee.service';
declare var rsaencrypt: Function;

@Component({
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss']
})
export class OrdersComponent implements OnInit {
  loading = false;
  pendingLoading = false;
  acceptedLoading = false;
  shippedLoading = false;
  alertoptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  customerDetails: any;
  customerAddress: any;
  unassignedOrders: any[] = new Array();
  acceptedOrders: any[] = new Array();
  shippedOrders: any[] = new Array();
  productList: any[] = new Array();
  orderData: any;

  selectedOrder: any;
  paymentTypes: string[] = ['Cash', 'Card', 'GooglePay', 'Phonepe', 'Paytm', 'NetBanking', 'Others'];
  paymentMode: string = this.paymentTypes[0];

  editQuantity = false;
  loadQuantity = false;

  newProductId = '';

  constructor(private orderService: OrdersService,
             private alertService: AlertService,
             private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.refreshCards();
  }

  refreshCards(){
    this.getUnAssignedOrders();
    this.getAcceptedOrders();
    this.getShippedOrders();
  }

  changeStatus(orderId, status){
    this.loading = true;
    this.orderService.changeOrderStatus(status, orderId, this.paymentMode)
                      .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          this.alertService.success("Order Status Updated!", this.alertoptions);
                          this.refreshCards();
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.loading = false;
                      },
                      (error:any)=>{
                        this.alertService.error("Something Went Wrong!");
                        this.loading = false;
                      })
  }

  acceptOrder(orderId){
    this.changeStatus(orderId, "Accepted");
  }

  rejectOrder(orderId){
    this.changeStatus(orderId, "Cancelled");
  }

  outForDelivery(order: any){
    this.changeStatus(order.orderId, "OutForDelivery");
  }

  deliveredOrder(order: any){
    this.changeStatus(order.orderId, "delivered");
  }

  getUnAssignedOrders(){
    this.pendingLoading = true;
    this.orderService.getUnassignedOrders()
                     .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          this.unassignedOrders = resp.dataList;
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.pendingLoading = false;
                     },
                     (error:any)=>{
                       this.alertService.error("Something Went Wrong!");
                     })
  }

  getShippedOrders(){
    this.shippedLoading = true;
    this.orderService.getAssignedOrders("OutForDelivery")
                     .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          this.shippedOrders = resp.dataList;
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.shippedLoading = false;
                     },
                     (error:any)=>{
                       this.alertService.error("Something Went Wrong!");
                     })
  }

  getAcceptedOrders(){
    this.acceptedLoading = true;
    this.orderService.getAssignedOrders("Accepted")
                     .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          this.acceptedOrders = resp.dataList;
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.acceptedLoading = false;
                     },
                     (error:any)=>{
                       this.alertService.error("Something Went Wrong!");
                     })
  }

  setProductData(order:any){
    this.productList.length = 0;
    let data: any[] = order.orderDetails;
    data.forEach(element => {
      this.productList.push(element);
    });
    this.orderData = order;
  }

  getCustomerDetails(id, addressId){
    this.acceptedLoading = true;
    this.employeeService.getCustomerById(id)
                        .subscribe((resp:any)=>{
                          if(resp.statusCode === 200){
                            this.customerDetails = resp.data;
                            this.customerDetails.customerAddress.forEach(address => {
                              if(address.addressId === addressId){
                                this.customerAddress = address;
                              }
                            })
                          }
                          else{
                            this.alertService.error("Failed: "  + resp.errorMessages);
                          }
                          this.acceptedLoading = false;
                        },
                        (error:any)=>{
                          this.alertService.error("Something Went Wrong!");
                        })
  }

  getCustomerFirstName(){
    if(this.customerDetails !== undefined){
      return this.customerDetails.firstName;
    }
  }

  getCustomerLastName(){
    if(this.customerDetails !== undefined){
      return this.customerDetails.lastName;
    }
  }

  getCustomerMobile(){
    if(this.customerDetails !== undefined){
      return this.customerDetails.mobile;
    }
  }

  getCustomerDoorNumber(){
    if(this.customerAddress !== undefined){
      return this.customerAddress.doorNumber;
    }
  }

  getCustomerStreet(){
    if(this.customerAddress !== undefined){
      return this.customerAddress.street;
    }
  }

  getCustomerCity(){
    if(this.customerAddress !== undefined){
      return this.customerAddress.city;
    }
  }

  getCustomerPin(){
    if(this.customerAddress !== undefined){
      return this.customerAddress.pincode;
    }
  }

  getDeliveryContact(){
    if(this.customerAddress !== undefined){
      return this.customerAddress.mobileContact;
    }
  }

  confirmPayment(order){
    this.selectedOrder = order;
  }

  getSelectedSubtotal(){
    if(this.selectedOrder !== undefined && this.selectedOrder !== null){
      return this.selectedOrder.subTotal;
    }
    return 0;
  }

  updateProductQuantity(product){
    this.loadQuantity = true;
    this.orderService.productQuantityUpdate(this.orderData.orderId, product.product.productId, product.quantity)
                      .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          this.editQuantity = false;
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.loadQuantity = false;
                    },
                    (error:any)=>{
                      this.alertService.error("Something Went Wrong!");
                      this.loadQuantity = false;
                    })
  }

  removeProduct(product){
    this.acceptedLoading = true;
    this.orderService.removeProduct(this.orderData.orderId, product.product.productId)
                      .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          let i = 0;
                          this.productList.forEach(prod => {
                            if(prod.product.productId === product.product.productId){
                              this.productList.splice(i,1);
                            }
                            i++;
                          })
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.acceptedLoading = false;
                      },
                      (error:any)=>{
                        this.alertService.error("Something Went Wrong!");
                        this.acceptedLoading = false;
                      })
  }

  addProductToOrder(){
    this.acceptedLoading = true;
    this.orderService.addProductToOrder(this.orderData.orderId, this.newProductId)
                      .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          this.productList.push(resp.data);
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.acceptedLoading = false;
                      },
                      (error:any)=>{
                        this.alertService.error("Something Went Wrong!");
                        this.acceptedLoading = false;
                      })
  }

  reassembleInvoice(){
    this.getAcceptedOrders();
    this.acceptedLoading = true;
    this.orderService.reassembleInvoice(this.orderData.orderId)
                      .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          //do nothing
                        }
                        else{
                          this.alertService.error("Failed: "  + resp.errorMessages);
                        }
                        this.acceptedLoading = false;
                      },
                      (error:any)=>{
                        this.alertService.error("Something Went Wrong!");
                        this.acceptedLoading = false;
                      })
  }

}
