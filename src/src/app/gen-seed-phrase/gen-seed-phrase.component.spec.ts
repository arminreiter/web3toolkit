import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenSeedPhraseComponent } from './gen-seed-phrase.component';

describe('GenSeedPhraseComponent', () => {
  let component: GenSeedPhraseComponent;
  let fixture: ComponentFixture<GenSeedPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenSeedPhraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenSeedPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
