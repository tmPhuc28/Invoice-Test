import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'invoice-detail/:id', component: InvoiceDetailComponent },
];
