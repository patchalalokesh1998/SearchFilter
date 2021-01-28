import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticerxjsComponent } from './practicerxjs.component';

describe('PracticerxjsComponent', () => {
  let component: PracticerxjsComponent;
  let fixture: ComponentFixture<PracticerxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticerxjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticerxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
