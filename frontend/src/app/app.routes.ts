import { Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transactions/add', component: TransactionFormComponent },
  { path: 'transactions/edit/:id', component: TransactionFormComponent }
];
