import { Injectable } from '@angular/core';

export interface InvoiceItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Invoice {
  id: number;
  customerName: string;
  date: string;
  items: InvoiceItem[];
  quantityAll: number;
  total: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor() {}
  // Hàm chuyển đổi nhóm 3 chữ số thành chữ
  private convertGroupToWords(group: number): string {
    const units = [
      '',
      'một',
      'hai',
      'ba',
      'bốn',
      'năm',
      'sáu',
      'bảy',
      'tám',
      'chín',
    ];
    const teens = [
      'mười',
      'mười một',
      'mười hai',
      'mười ba',
      'mười bốn',
      'mười năm',
      'mười sáu',
      'mười bảy',
      'mười tám',
      'mười chín',
    ];
    const tens = [
      '',
      '',
      'hai mươi',
      'ba mươi',
      'bốn mươi',
      'năm mươi',
      'sáu mươi',
      'bảy mươi',
      'tám mươi',
      'chín mươi',
    ];

    const h = Math.floor(group / 100); // Hàng trăm
    const t = Math.floor((group % 100) / 10); // Hàng chục
    const u = group % 10; // Hàng đơn vị

    let result = '';

    if (h > 0) {
      result += units[h] + ' trăm';
    }
    if (t > 1) {
      result += ' ' + tens[t];
    } else if (t === 1) {
      result += ' ' + teens[u]; // Nếu hàng chục là 1 thì xử lý riêng
      return result.trim();
    }
    if (u > 0) {
      result += ' ' + units[u];
    }

    return result.trim();
  }
  numberToWords(number: number): string {
    if (number === 0) return 'không đồng';
    const thousands = ['', 'nghìn', 'triệu', 'tỷ'];

    let result = '';
    let groupCount = 0;

    // Chia số thành các nhóm 3 chữ số
    while (number > 0) {
      const group = number % 1000; // Lấy nhóm 3 chữ số cuối cùng
      number = Math.floor(number / 1000); // Chia cho 1000 để lấy nhóm tiếp theo

      if (group > 0) {
        const groupStr = this.convertGroupToWords(group);
        result =
          groupStr +
          (thousands[groupCount] ? ' ' + thousands[groupCount] : '') +
          ' ' +
          result;
      }
      groupCount++;
    }

    return result.trim() + ' đồng';
  }

  getInvoices(): Invoice[] {
    const items1: InvoiceItem[] = [
      {
        productName: 'Quạt gió SENKO 5 cánh 6 tất',
        quantity: 1,
        unitPrice: 480000,
        totalPrice: 1 * 480000,
      },
      {
        productName: 'Bóng đèn LED 30W',
        quantity: 2,
        unitPrice: 80000,
        totalPrice: 2 * 80000,
      },
    ];

    const quantityAll1 = items1.reduce((sum, item) => sum + item.quantity, 0);
    const total1 = items1.reduce((sum, item) => sum + item.totalPrice, 0);

    return [
      {
        id: 1,
        customerName: 'Nguyễn Văn A',
        date: '20/10/2024',
        items: items1,
        quantityAll: quantityAll1,
        total: total1,
        paymentMethod: 'Tiền mặt',
      },
    ];
  }
}
