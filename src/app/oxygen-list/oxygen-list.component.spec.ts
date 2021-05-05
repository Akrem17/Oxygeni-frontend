import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxygenListComponent } from './oxygen-list.component';

describe('OxygenListComponent', () => {
  let component: OxygenListComponent;
  let fixture: ComponentFixture<OxygenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxygenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxygenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
