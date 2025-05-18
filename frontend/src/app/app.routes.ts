import { Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'transaction-list', pathMatch: 'full' },
  
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'add', component: TransactionFormComponent },
  { path: 'edit/:id', component: TransactionFormComponent },
 
];
