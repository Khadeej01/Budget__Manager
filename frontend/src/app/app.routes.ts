import { Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { HomeComponent } from './pages/home/home.component';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetCreateComponent } from './components/budget-create/budget-create.component';


export const routes: Routes = [


  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'add', component: TransactionFormComponent },
  { path: 'edit/:id', component: TransactionFormComponent },
  { path: '', component: HomeComponent },
  { path: 'ajouter-budget', component: BudgetFormComponent },
  { path: 'budget-list', component: BudgetListComponent },

  { path: '', component: BudgetListComponent },
  { path: 'create', component: BudgetCreateComponent }

];


