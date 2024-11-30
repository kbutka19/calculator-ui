import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionValidatorComponent } from './expression-validator.component';

describe('ExpressionValidatorComponent', () => {
  let component: ExpressionValidatorComponent;
  let fixture: ComponentFixture<ExpressionValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionValidatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpressionValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
