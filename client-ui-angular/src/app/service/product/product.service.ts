import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  featuredProductsEndpoint = "/product/getFeaturedProducts";
  getProductsEndpoint = "/product/getProductsWithImages";
  getProductCountEndpoint = "/product/getProductCount";
  getProductsBySearchTermEndpoint = "/product/getProductsBySearchText";

  getCategoriesEndpoint = "/category/getCategories";

  constructor(private http: HttpClient) { }

  getAllFeaturedProducts(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.featuredProductsEndpoint);
  }

  getProducts(cIds, offset, limit, sortField, sortType): Observable<any>{
    //Set Headers
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Offset', offset)
    .append('Limit', limit);

    if(cIds === undefined || cIds === null || cIds === ''){
      cIds = new Array();
    }
    const httpOptions = {
      headers: requestHeaders,
      params: {
        cIds: cIds,
        sortField: sortField,
        sortType: sortType
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductsEndpoint, httpOptions);
  }

  getproductCount(cIds): Observable<any>{
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    if(cIds === undefined || cIds === null || cIds === ''){
      cIds = new Array();
    }
    const httpOptions = {
      headers: requestHeaders,
      params: {
        cIds: cIds
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductCountEndpoint, httpOptions);
  }

  getAllCategories(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.getCategoriesEndpoint);
  }

  getProductsBySearchTerm(cIds, searchTerm, limit, offset, sortField, sortType): Observable<any>{
     let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
     .append('Offset', offset)
     .append('Limit', limit);

     const httpOptions = {
       headers: requestHeaders,
       params: {
         searchTerm:searchTerm,
         cIds: cIds,
         sortField: sortField,
         sortType: sortType
       }
     };
     return this.http.get(environment.backendBaseUrl+this.getProductsBySearchTermEndpoint, httpOptions);
  }

}
