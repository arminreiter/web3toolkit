import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBalanceComponent } from './get-balance.component';

describe('GetBalanceComponent', () => {
  let component: GetBalanceComponent;
  let fixture: ComponentFixture<GetBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
