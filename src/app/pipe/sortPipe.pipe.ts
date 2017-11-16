import { Pipe, PipeTransform } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';

@Pipe({name: 'sortBy'})
export class SortPipe implements PipeTransform {

  hasNumber(string) {
    return /\d/.test(string);
  }

  transform(array: Array<any>, args: string): Array<any> {
    (!args) ? args = '#' : args = args.toLowerCase();
    array.sort((a: any, b: any) => {
      let paramA, paramB;
      if (this.hasNumber(a[args]) && this.hasNumber(b[args])) {
        paramA = parseInt(a[args]);
        paramB = parseInt(b[args]);
      } else {
        paramA = a[args];
        paramB = b[args];
      }

      if ( paramA < paramB ) {
        return -1;
      }else if ( paramA > paramB ) {
        return 1;
      }else {
        return 0;
      }
    });
    return array;
  }
}
