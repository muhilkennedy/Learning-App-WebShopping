import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor() { }

  private _globalLoading: boolean = false;
  private _pincodeDetails: any;
  private _couponDetails: any;
  private _isHomeClicked = true;
  private _isShowNowClicked = false;
  private _isContactClicked = false;
  private _alertoptionsError = {
    duration: 2000,
    panelClass: ['error-snackbar']
  };
  private _alertoptionsWarn = {
    duration: 3000,
    panelClass: ['warn-snackbar']
  };
  private _alertoptionsSuccess = {
    duration: 2000,
    panelClass: ['success-snackbar']
  };
  private _alertoptionsDefault = {
    duration: 3000
  };
  private _categories: any;
  private _searchText: string;
  private _cartTotal: number;
  private _cartItems: any[];

  public get cartItems(): any[] {
    return this._cartItems;
  }

  public set cartItems(value: any[]) {
    this._cartItems = value;
  }

  public get cartTotal(): number {
    return this._cartTotal;
  }

  public set cartTotal(value: number) {
    this._cartTotal = value;
  }

  public get searchText(): string {
    return this._searchText;
  }

  public set searchText(value: string) {
    this._searchText = value;
  }

  public get categories(): any {
    return this._categories;
  }

  public set categories(value: any) {
    this._categories = value;
  }

  public get alertoptionsDefault() {
    return this._alertoptionsDefault;
  }

  public set alertoptionsDefault(value) {
    this._alertoptionsDefault = value;
  }

  public get alertoptionsSuccess() {
    return this._alertoptionsSuccess;
  }

  public set alertoptionsSuccess(value) {
    this._alertoptionsSuccess = value;
  }

  public get alertoptionsWarn() {
    return this._alertoptionsWarn;
  }

  public set alertoptionsWarn(value) {
    this._alertoptionsWarn = value;
  }


  public get alertoptionsError() {
    return this._alertoptionsError;
  }

  public set alertoptionsError(value) {
    this._alertoptionsError = value;
  }


  public get isContactClicked() {
    return this._isContactClicked;
  }

  public set isContactClicked(value) {
    this._isContactClicked = value;
  }

  public get isShowNowClicked() {
    return this._isShowNowClicked;
  }

  public set isShowNowClicked(value) {
    this._isShowNowClicked = value;
  }

  public get isHomeClicked() {
    return this._isHomeClicked;
  }

  public set isHomeClicked(value) {
    this._isHomeClicked = value;
  }

  public get globalLoading(): boolean {
    return this._globalLoading;
  }

  public set globalLoading(value: boolean) {
    this._globalLoading = value;
  }

  public get pincodeDetails(): any {
    return this._pincodeDetails;
  }

  public set pincodeDetails(value: any) {
    this._pincodeDetails = value;
  }

  public get couponDetails(): any {
    return this._couponDetails;
  }

  public set couponDetails(value: any) {
    this._couponDetails = value;
  }

}
