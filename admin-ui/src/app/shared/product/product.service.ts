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
  getProductCountEndpoint = "/product/getProductCount";
  getCategoriesTypeAheadEndPoint = "/category/getCategoriesForTypeahead";
  updateOrCreateProductEndpoint = "/product/secure/admin/createOrUpdateProduct"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getCategoriesEndpoint);
  }

  getCategoriesForTypeahead(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getCategoriesTypeAheadEndPoint);
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

  getProducts(pIds, cIds, offset, limit, sortField, sortType, loadInactive){
      //Set Headers
      let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Offset', offset)
      .append('Limit', limit);

      const httpOptions = {
        headers: requestHeaders,
        params: {
          pIds: pIds,
          cIds: cIds,
          sortField: sortField,
          sortType: sortType,
          includeInactive: loadInactive
        }
      };
      return this.http.get(environment.backendBaseUrl+this.getProductsEndpoint, httpOptions);
  }

  getproductCount(cIds){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const httpOptions = {
      headers: requestHeaders,
      params: {
        cIds: cIds
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductCountEndpoint, httpOptions);
  }

  createOrUpdateProduct(file, catId, productId, productName, productBrand, cost, offer,description, active){
    const uploadData = new FormData();
    if(file=== undefined){
      file=null;
    }
    uploadData.append('productImage', file);
    uploadData.append('categoryId', catId);
    uploadData.append('productId', productId);
    uploadData.append('productName', productName);
    uploadData.append('productBrand', productBrand);
    uploadData.append('cost', cost);
    uploadData.append('offer', offer);
    uploadData.append('description', description);
    uploadData.append('active', active);
    return this.http.post(environment.backendBaseUrl+this.updateOrCreateProductEndpoint, uploadData);
  }

}
