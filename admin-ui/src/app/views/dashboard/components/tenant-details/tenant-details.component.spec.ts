import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDetailsComponent } from './tenant-details.component';

describe('TenantDetailsComponent', () => {
  let component: TenantDetailsComponent;
  let fixture: ComponentFixture<TenantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
