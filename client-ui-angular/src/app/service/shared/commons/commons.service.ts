import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor() { }

  private _globalLoading: boolean = false;
  private _pincodeDetails: any;
  private _couponDetails: any;

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
