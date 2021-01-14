import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDialogComponent } from './orders-dialog.component';

describe('OrdersDialogComponent', () => {
  let component: OrdersDialogComponent;
  let fixture: ComponentFixture<OrdersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
