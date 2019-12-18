import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorValidate'
})
export class ColorValidatePipe implements PipeTransform {

  transform(value: boolean): any {
    return value ? 'primary' : '';
  }

}
