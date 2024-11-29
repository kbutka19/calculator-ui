import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { prodCubes, prodCubes2, prodFactorial, prodFactorial2, prodSquares, prodSquares2,  sumCubes, sumCubes2, sumFactorial, sumInt2, sumSquares, sumSquares2 } from './extras/utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'calculator-ui';

  ngOnInit() {
    console.log('normal',
      sumSquares(1, 5),
      sumCubes(1, 5), sumFactorial(1, 5)
    )
    console.log('formated', sumInt2(1, 5), sumSquares2(1, 5), sumCubes2(1, 5), sumFactorial(1, 5))
    console.log('production', prodSquares(1, 5), prodCubes(1, 5), prodFactorial(1, 5))
    console.log('production refactor', prodSquares2(1, 5), prodCubes2(1, 5), prodFactorial2(1, 5))
    // console.log(prodSquares3(1, 5))
  }

}
