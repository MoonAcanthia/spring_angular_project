import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSuccess } from './reset-success';

describe('ResetSuccess', () => {
  let component: ResetSuccess;
  let fixture: ComponentFixture<ResetSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
