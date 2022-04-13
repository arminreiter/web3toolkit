import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsSidebarComponent } from './tools-sidebar.component';

describe('ToolsSidebarComponent', () => {
  let component: ToolsSidebarComponent;
  let fixture: ComponentFixture<ToolsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
