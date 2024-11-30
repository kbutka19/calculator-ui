import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { evaluate } from '@suprnation/evaluator';

interface HistoricalValues {
  userInput: number;
  evaluatedValue: number;
}

@Component({
  selector: 'app-expression-validator',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatError, MatButtonModule, MatIcon, MatListModule
  ],
  templateUrl: './expression-validator.component.html',
  styleUrl: './expression-validator.component.scss'
})
export class ExpressionValidatorComponent {
  form: FormGroup = new FormGroup({ expression: new FormControl(undefined, this.expressionValidator()) });
  resultMsg!: string;
  historicalValues: Array<HistoricalValues> = [];
  showHistory!: boolean;

  expressionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const evaluation = evaluate(control.value);
      if (evaluation.success) {
        this.resultMsg = 'Success! Result of computed expression: ' + evaluation.value;
        this.historicalValues.unshift({
          userInput: control.value,
          evaluatedValue: evaluation.value
        })
        if (this.historicalValues.length > 5) {
          this.historicalValues.pop();
        }
        return null;
      } else {
        this.resultMsg = '';
        return { notValid: evaluation.reason }
      }
    }
  }
  toggleHistory() {
    this.showHistory = !this.showHistory;
  }
}


