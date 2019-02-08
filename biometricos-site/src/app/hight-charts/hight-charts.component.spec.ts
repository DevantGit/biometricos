import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HightChartsComponent } from './hight-charts.component';

describe('HightChartsComponent', () => {
  let component: HightChartsComponent;
  let fixture: ComponentFixture<HightChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HightChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HightChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
