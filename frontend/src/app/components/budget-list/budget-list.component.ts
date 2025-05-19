import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget.service';
import { HttpClientModule } from '@angular/common/http';
import {Budget} from '../../models/budget.model';

@Component({
  selector: 'app-budget-list', // ce nom DOIT correspondre au <app-budget-list>
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
  budgets: Budget[] = [];

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.budgetService.getBudgets().subscribe({
      next: data => {
        console.log('Budgets reçus :', data);
        this.budgets = data;
      },
      error: err => {
        console.error('Erreur API :', err);
      }
    });
  }
}

