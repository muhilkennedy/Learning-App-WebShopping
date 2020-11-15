import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCountComponent } from './sales-count.component';

describe('SalesCountComponent', () => {
  let component: SalesCountComponent;
  let fixture: ComponentFixture<SalesCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
