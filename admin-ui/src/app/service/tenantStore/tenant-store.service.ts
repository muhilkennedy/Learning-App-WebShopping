import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantStoreService {

  private _tenantId: string;
  private _tenantName: string;
  private _tenantActive: boolean;
  private _publicKey: string;
  //tenant details
  private _tenantDetailId: number;
  private _tenantEmail: string;
  private _businessEmail: string;
  private _tenantStreet: string;
  private _tenantCity: string;
  private _tenantPin: string;
  private _tenantContact: string;
  private _tenantFacebook: string;
  private _tenantInsta: string;
  private _tenantTwitter: string;
  private _tenantGstIn: string;

  constructor() {
    this.tenantId = environment.tenantId;
  }

  set tenantGstIn(gst: string){
    this._tenantGstIn = gst;
  }

  get tenantGstIn():string{
    return this._tenantGstIn;
  }

  set tenantId(id:string){
    this._tenantId = id;
  }

  get tenantId():string{
    return this._tenantId;
  }

  set tenantName(name:string){
    this._tenantName = name;
  }

  get tenantName():string{
    return this._tenantName;
  }

  set tenantActive(active:boolean){
    this._tenantActive = active;
  }

  get tenantActive():boolean{
    return this._tenantActive;
  }

  set publicKey(key: string){
    this._publicKey = key;
  }

  get publicKey(): string {
    return this._publicKey;
  }

  //tenant details getter setters.

  public get tenantTwitter(): string {
    return this._tenantTwitter;
  }
  public set tenantTwitter(value: string) {
    this._tenantTwitter = value;
  }

  public get tenantDetailId(): number {
    return this._tenantDetailId;
  }
  public set tenantDetailId(value: number) {
    this._tenantDetailId = value;
  }

  public get tenantEmail(): string {
    return this._tenantEmail;
  }
  public set tenantEmail(value: string) {
    this._tenantEmail = value;
  }

  public get businessEmail(): string {
    return this._businessEmail;
  }
  public set businessEmail(value: string) {
    this._businessEmail = value;
  }

  public get tenantStreet(): string {
    return this._tenantStreet;
  }
  public set tenantStreet(value: string) {
    this._tenantStreet = value;
  }

  public get tenantCity(): string {
    return this._tenantCity;
  }
  public set tenantCity(value: string) {
    this._tenantCity = value;
  }

  public get tenantPin(): string {
    return this._tenantPin;
  }
  public set tenantPin(value: string) {
    this._tenantPin = value;
  }

  public get tenantFacebook(): string {
    return this._tenantFacebook;
  }
  public set tenantFacebook(value: string) {
    this._tenantFacebook = value;
  }

  public get tenantContact(): string {
    return this._tenantContact;
  }
  public set tenantContact(value: string) {
    this._tenantContact = value;
  }

  public get tenantInsta(): string {
    return this._tenantInsta;
  }
  public set tenantInsta(value: string) {
    this._tenantInsta = value;
  }

}

