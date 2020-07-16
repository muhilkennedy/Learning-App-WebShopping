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
  private _designation: string;
  private _active: boolean;
  private _lastLogin: boolean;
  private _profilePic: string;
  private _employeeAddress: any[];
  private _employeePermissions: any[];

  constructor() { }

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

  public get designation(): string {
    return this._designation;
  }
  public set designation(value: string) {
    this._designation = value;
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

  public get employeeAddress(): any[] {
    return this._employeeAddress;
  }
  public set employeeAddress(value: any[]) {
    this._employeeAddress = value;
  }

  public get employeePermissions(): any[] {
    return this._employeePermissions;
  }
  public set employeePermissions(value: any[]) {
    this._employeePermissions = value;
  }
}
