import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CherherOxygenComponent } from './cherher-oxygen.component';

describe('CherherOxygenComponent', () => {
  let component: CherherOxygenComponent;
  let fixture: ComponentFixture<CherherOxygenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CherherOxygenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CherherOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
