import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosHistoryComponent } from './pos-history.component';

describe('PosHistoryComponent', () => {
  let component: PosHistoryComponent;
  let fixture: ComponentFixture<PosHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
