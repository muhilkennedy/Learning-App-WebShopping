import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  homeMediaEndpoint = "/base/homeMedia";
  featuredProductsEndpoint = "/product/getFeaturedProducts";

  getAllHomeMedia() : Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.homeMediaEndpoint);
  }

  getAllFeaturedProducts(){
    return this.http.get(environment.backendBaseUrl+this.featuredProductsEndpoint);
  }

}
