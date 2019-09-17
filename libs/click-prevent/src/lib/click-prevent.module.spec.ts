import { async, TestBed } from '@angular/core/testing';
import { ClickPreventModule } from './click-prevent.module';

describe('ClickPreventModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClickPreventModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClickPreventModule).toBeDefined();
  });
});
