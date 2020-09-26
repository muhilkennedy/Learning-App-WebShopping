import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessengerComponent } from './chat-messenger.component';

describe('ChatMessengerComponent', () => {
  let component: ChatMessengerComponent;
  let fixture: ComponentFixture<ChatMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
