import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRegistrationsComponent } from './available-registrations.component';

describe('AvailableRegistrationsComponent', () => {
  let component: AvailableRegistrationsComponent;
  let fixture: ComponentFixture<AvailableRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
