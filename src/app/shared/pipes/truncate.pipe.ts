import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    if(!value) return '';
    return value.length > 10 ? value.substring(0, limit) + '...' : value;
  }

}
