import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlagSelectorComponent } from './ngx-flag-selector.component';

describe('NgxFlagSelectorComponent', () => {
  let component: NgxFlagSelectorComponent;
  let fixture: ComponentFixture<NgxFlagSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFlagSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFlagSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
