import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOxygenComponent } from './add-oxygen.component';

describe('AddOxygenComponent', () => {
  let component: AddOxygenComponent;
  let fixture: ComponentFixture<AddOxygenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOxygenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
