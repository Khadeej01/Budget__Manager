import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Budget} from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/budgets';

  constructor(private http: HttpClient) {}

  getBudgets() {
    return this.http.get<Budget[]>(this.apiUrl);
  }

  addBudget(budget: any) {
    return this.http.post(this.apiUrl, budget);
  }
}
