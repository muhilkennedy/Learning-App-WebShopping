import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getCategoriesEndpoint = "/product/getCategories";
  createCategoryEndpoint = "/product/secure/admin/createCategory";
  deleteCategoryEndpoint = "/product/secure/admin/deleteCategory";
  editCategoryNameEndpoint = "/product/secure/admin/editCategoryName";

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

}
