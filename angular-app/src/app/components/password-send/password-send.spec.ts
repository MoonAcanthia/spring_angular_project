import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSend } from './password-send';

describe('PasswordSend', () => {
  let component: PasswordSend;
  let fixture: ComponentFixture<PasswordSend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordSend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordSend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
