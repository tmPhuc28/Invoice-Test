import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InvoiceService, Invoice } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule],
  //templateUrl: './invoice-list.component.html',
  template: `
  <h2>Danh sách hóa đơn</h2>
  <table>
    <thead>
      <tr>
        <th>Mã hóa đơn</th>
        <th>Khách hàng</th>
        <th>Ngày</th>
        <th>Tổng tiền</th>
        <th>Xem chi tiết</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let invoice of invoices">
        <td>{{ invoice.id }}</td>
        <td>{{ invoice.customerName }}</td>
        <td>{{ invoice.date }}</td>
        <td>{{ invoice.total | currency:'VND' }}</td>
        <td><button (click)="viewInvoice(invoice.id)">Xem</button></td>
      </tr>
    </tbody>
  </table>
`,
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent {
  invoices: Invoice[] = [];
  constructor(private invoiceService: InvoiceService, private router: Router) {
    this.invoices = this.invoiceService.getInvoices();
  }

  viewInvoice(id: number) {
    this.router.navigate([`/invoice-detail`, id]);
  }
}
