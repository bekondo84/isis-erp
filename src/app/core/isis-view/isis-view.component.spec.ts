import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsisViewComponent } from './isis-view.component';

describe('IsisViewComponent', () => {
  let component: IsisViewComponent;
  let fixture: ComponentFixture<IsisViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsisViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
