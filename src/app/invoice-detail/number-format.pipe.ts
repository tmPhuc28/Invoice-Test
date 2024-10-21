import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '0 đ';
    }

    // Chuyển đổi số thành chuỗi, thay đổi dấu phân cách và thêm ' đ'
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  }
}
