import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private _JwtToken: string;
  private _userId: number;
  private _firstName: string;
  private _lastName: string;
  private _emailId: string;
  private _mobile: number;
  private _active: boolean;
  private _lastLogin: boolean;
  private _profilePic: string;
  private _profilePicUrl: string;
  private _customerAddress: any[];
  private _loyalityPoints: number;
  private _loginMode: string;
  private _cartCount: number;
  private _cartItems: any[] = new Array();

  constructor() { }

  public get customerAddress(): any[] {
    return this._customerAddress;
  }

  public set customerAddress(value: any[]) {
    this._customerAddress = value;
  }

  public get cartCount(): number {
    return this._cartCount;
  }

  public set cartCount(value: number) {
    this._cartCount = value;
  }

  public get cartItems(): any[] {
    return this._cartItems;
  }

  public set cartItems(value: any[]) {
    this._cartItems = value;
  }
  public get loginMode(): string {
    return this._loginMode;
  }

  public set loginMode(value: string) {
    this._loginMode = value;
  }

  public get loyalityPoints(): number {
    return this._loyalityPoints;
  }

  public set loyalityPoints(value: number) {
    this._loyalityPoints = value;
  }

  public get profilePicUrl(): string {
    return this._profilePicUrl;
  }

  public set profilePicUrl(value: string) {
    this._profilePicUrl = value;
  }

  public get JwtToken(): string {
    return this._JwtToken;
  }
  public set JwtToken(value: string) {
    this._JwtToken = value;
  }

  public get userId(): number {
    return this._userId;
  }
  public set userId(value: number) {
    this._userId = value;
  }

  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(value: string) {
    this._lastName = value;
  }

  public get emailId(): string {
    return this._emailId;
  }
  public set emailId(value: string) {
    this._emailId = value;
  }

  public get mobile(): number {
    return this._mobile;
  }
  public set mobile(value: number) {
    this._mobile = value;
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

  public get lastLogin(): boolean {
    return this._lastLogin;
  }
  public set lastLogin(value: boolean) {
    this._lastLogin = value;
  }

  public get profilePic(): string {
    return this._profilePic;
  }
  public set profilePic(value: string) {
    this._profilePic = value;
  }

}
