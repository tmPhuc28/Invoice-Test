import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService, Invoice } from '../invoice.service';
import { NumberFormatPipe } from './number-format.pipe';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css',
})
export class InvoiceDetailComponent {
  invoice: Invoice | undefined;
  totalInWords: string = '';

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {
    const id = this.route.snapshot.params['id'];
    this.invoice = this.invoiceService
      .getInvoices()
      .find((inv) => inv.id === +id);
    if (this.invoice) {
      this.totalInWords = this.invoiceService.numberToWords(this.invoice.total);
    }
  }

  print() {
    const printContents = document.getElementById('printArea')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents || '';
    window.print();
    document.body.innerHTML = originalContents || '';
  }
  // print() {
  //   const printContents = document.getElementById('printArea')?.innerHTML;
  //   if (printContents) {
  //     const newWindow = window.open('', '_blank');
  //     if (newWindow) {
  //       // Chỉ thêm các kiểu CSS cần thiết cho phần in
  //       const styles = `
  //         <style>
  //           .receipt {
  //       border: 1px solid #000;
  //       padding: 10px;
  //       font-family: Arial, sans-serif;
  //       font-size: 12px;
  //       max-width: 58mm;
  //       margin: 0 auto;
  //   }

  //   .header {
  //       text-align: center;
  //   }

  //   .header h1 {
  //       font-size: 16px;
  //       margin: 5px 0;
  //   }

  //   .header p {
  //       margin: 3px 0;
  //   }

  //   .info {
  //       margin: 15px 0;
  //   }

  //   .info p {
  //       margin: 3px 0;
  //   }

  //   table {
  //       width: 100%;
  //       font-size: medium;
  //       border-collapse: collapse;
  //   }

  //   th,
  //   td {
  //       text-align: left;
  //       padding: 5px 0;
  //   }

  //   th {
  //       border-bottom: 1px dashed #000;
  //   }

  //   .total,
  //   .amount {
  //       font-weight: bold;
  //       text-align: right;
  //   }

  //   .footer {
  //       margin-top: 10px;
  //       text-align: center;
  //   }

  //   .footer p {
  //       margin: 5px 0;
  //   }

  //         </style>
  //       `;

  //       newWindow.document.write(`
  //         <html>
  //           <head>
  //             <title>Print Invoice</title>
  //             ${styles}
  //           </head>
  //           <body onload="window.print(); window.close();">
  //             ${printContents}
  //           </body>
  //         </html>
  //       `);
  //       newWindow.document.close();
  //     }
  //   }
  // }
}
