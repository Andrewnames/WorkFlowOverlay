import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugTestComponent } from './debug-test.component';

describe('DebugTestComponent', () => {
  let component: DebugTestComponent;
  let fixture: ComponentFixture<DebugTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
