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
  getProductByCodeEndpoint = "/product/secure/admin/getProductByCode";
  getProductImagesEndpoint = "/product/getProductsImage";
  getProductByIdsEndpoint = "/product/getProductsById";
  uploadProductImageEndpoint = "/product/secure/admin/uploadProductImage";
  removeProductImageEndpoint = "/product/secure/admin/removeProductImage";
  replacProductImageEndpoint = "/product/secure/admin/removeProductImage";
  toggleProductStatusEndpoint = "/product/secure/admin/toggleProductStatus";
  getProductByNameMatchingEndpoint = "/product/getProductsByName";
  getFeaturedProductsEndpoint = "/product/getFeaturedProducts";
  addFeaturedProductEndpoint = "/product/secure/admin/addFeaturedProducts";
  isFeaturedProductEndpoint = "/product/secure/admin/isFeaturedProducts";
  deleteFeaturedProductEndpoint = "/product/secure/admin/deleteFeaturedProducts";
  getProductByMatchingNameOrCodeEndpoint = "/product/getProductsByNameOrCode";

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

  getProductsByIds(pId){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const httpOptions = {
      headers: requestHeaders,
      params: {
        pIds: pId
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductByIdsEndpoint, httpOptions);
  }

  getProducts(pIds, cIds, offset, limit, sortField, sortType, loadInactive, outOfStock){
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
          includeInactive: loadInactive,
          outOfStock: outOfStock
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

  createOrUpdateProduct(file, catId, productId, productName, productBrand, cost, offer,
                        description, active, pcode, unitsInStock){
    const uploadData = new FormData();
    if(file === undefined){
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
    uploadData.append('code', pcode);
    uploadData.append('units', unitsInStock);
    return this.http.post(environment.backendBaseUrl+this.updateOrCreateProductEndpoint, uploadData);
  }

  getProductByCode(code): Observable<any> {
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const httpOptions = {
      headers: requestHeaders,
      params: {
        pCode: code
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductByCodeEndpoint, httpOptions);
  }

  getProductImages(id): Observable<any>{
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const httpOptions = {
      headers: requestHeaders,
      params: {
        pIds: id
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductImagesEndpoint, httpOptions);
  }

  uploadProductImage(pId, file){
    const uploadData = new FormData();
    if(file === undefined){
      file=null;
    }
    uploadData.append('productImage', file);
    uploadData.append('productId', pId);
    return this.http.post(environment.backendBaseUrl+this.uploadProductImageEndpoint, uploadData);
  }

  removeProductImage(imageId){
    const httpOptions = {
      params: {productImageId: imageId}
    };
    return this.http.delete(environment.backendBaseUrl+this.removeProductImageEndpoint, httpOptions);
  }

  replaceProductImage(piId, file){
    const uploadData = new FormData();
    if(file === undefined){
      file=null;
    }
    uploadData.append('productImage', file);
    uploadData.append('productImageId', piId);
    return this.http.post(environment.backendBaseUrl+this.replacProductImageEndpoint, uploadData);
  }

  toggleProductStatus(pId, status){
    const uploadData = new FormData();
    uploadData.append('productId', pId);
    uploadData.append('productStatus', status);
    return this.http.post(environment.backendBaseUrl+this.toggleProductStatusEndpoint, uploadData);
  }

  getProductByName(searchText){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const httpOptions = {
      headers: requestHeaders,
      params: {
        searchTerm: searchText
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductByNameMatchingEndpoint, httpOptions);
  }

  getProductByMatchingNameOrCode(searchText){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const httpOptions = {
      headers: requestHeaders,
      params: {
        searchTerm: searchText
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getProductByMatchingNameOrCodeEndpoint, httpOptions);
  }

  getFeaturedProducts(){
    return this.http.get(environment.backendBaseUrl+this.getFeaturedProductsEndpoint);
  }

  addFeatureProduct(pId){
    const uploadData = new FormData();
    uploadData.append('productId', pId);
    return this.http.post(environment.backendBaseUrl+this.addFeaturedProductEndpoint, uploadData);
  }

  deleteFeaturedProduct(pId){
    const httpOptions = {
      params: {productId: pId}
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteFeaturedProductEndpoint, httpOptions);
  }

  isFeaturedProduct(pId){
    const httpOptions = {
      params: {productId: pId}
    };
    return this.http.get(environment.backendBaseUrl+this.isFeaturedProductEndpoint, httpOptions);
  }

}
