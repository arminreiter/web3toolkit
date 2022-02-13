import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInuseComponent } from './actions-inuse.component';

describe('ActionsInuseComponent', () => {
  let component: ActionsInuseComponent;
  let fixture: ComponentFixture<ActionsInuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsInuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsInuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
