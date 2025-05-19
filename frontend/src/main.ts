import { bootstrapApplication } from '@angular/platform-browser';
import { BudgetListComponent } from './app/components/budget-list/budget-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(BudgetListComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));
