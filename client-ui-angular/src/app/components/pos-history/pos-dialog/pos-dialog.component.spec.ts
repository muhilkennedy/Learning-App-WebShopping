import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosDialogComponent } from './pos-dialog.component';

describe('PosDialogComponent', () => {
  let component: PosDialogComponent;
  let fixture: ComponentFixture<PosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
