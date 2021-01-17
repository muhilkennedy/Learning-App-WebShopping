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
