import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BudgetFormComponent} from './components/budget-form/budget-form.component';
import {BudgetListComponent} from './components/budget-list/budget-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BudgetFormComponent, BudgetListComponent,NavbarComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
