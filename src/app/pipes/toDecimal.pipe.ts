import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDecimal',
  pure: false
})
export class ToDecimalPipe implements PipeTransform {
  transform(value: number, decimalPoints: number): string {
    let result: number = 0;

    let aux = Math.pow(10, decimalPoints);

    result = Math.round(value * aux);

    result /= aux;

    return result.toFixed(decimalPoints);
  }
}