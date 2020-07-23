import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePermissionComponent } from './employee-permission.component';

describe('EmployeePermissionComponent', () => {
  let component: EmployeePermissionComponent;
  let fixture: ComponentFixture<EmployeePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
