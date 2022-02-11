import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetKeysFromSeedPhraseComponent } from './get-keys-from-seed-phrase.component';

describe('GetKeysFromSeedPhraseComponent', () => {
  let component: GetKeysFromSeedPhraseComponent;
  let fixture: ComponentFixture<GetKeysFromSeedPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetKeysFromSeedPhraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetKeysFromSeedPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
