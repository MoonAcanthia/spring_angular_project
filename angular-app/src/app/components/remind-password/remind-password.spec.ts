import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindPassword } from './remind-password';

describe('RemindPassword', () => {
  let component: RemindPassword;
  let fixture: ComponentFixture<RemindPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemindPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
