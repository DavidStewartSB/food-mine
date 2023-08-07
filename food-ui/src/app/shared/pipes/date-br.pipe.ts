import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateBr'
})
export class DateBrPipe implements PipeTransform {
  transform(value: any, format: string = 'medium'): any {
    if (value) {
      const datePipe = new DatePipe('pt-BR');
      return datePipe.transform(value, format);
    }
    return null;
  }
}