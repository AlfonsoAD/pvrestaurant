import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserChangepasswordComponent } from './modal-user-changepassword.component';

describe('ModalUserChangepasswordComponent', () => {
  let component: ModalUserChangepasswordComponent;
  let fixture: ComponentFixture<ModalUserChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUserChangepasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUserChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
