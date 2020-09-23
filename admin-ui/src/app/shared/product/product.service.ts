import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getCategoriesEndpoint = "/category/getCategories";
  createCategoryEndpoint = "/category/secure/admin/createCategory";
  deleteCategoryEndpoint = "/category/secure/admin/deleteCategory";
  editCategoryNameEndpoint = "/category/secure/admin/editCategoryName";

  getProductsEndpoint = "/product/getProducts";
  createProductEndpoint = "/product/secure/admin/createProduct";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getCategoriesEndpoint);
  }

 createCategory(catName, parentId): Observable<any>{
  const body = {
    categoryName: catName,
	  parentCategoryId: parentId
   };
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.post(environment.backendBaseUrl+this.createCategoryEndpoint, body, httpOptions);
 }

  deleteCategory(catId){
    const httpOptions = {
      params: {ids: catId}
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteCategoryEndpoint, httpOptions);
  }

  editCategoryName(catId: number, name: string){
    const httpOptions = {
      categoryId: catId,
      categoryName: name
    };
    return this.http.put(environment.backendBaseUrl+this.editCategoryNameEndpoint, httpOptions);
  }

  getProducts(pIds, cIds, limit, offset){
        //Set Headers
        let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
        .append('Offset', offset)
        .append('Limit', limit);

        const httpOptions = {
          headers: requestHeaders,
          params: {
            pIds: pIds,
            cIds: cIds
          }
        };

        return this.http.get(environment.backendBaseUrl+this.getProductsEndpoint, httpOptions);
  }

}
