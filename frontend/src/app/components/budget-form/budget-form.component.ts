import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent {
  budget = {
    amount: 0,
    categoryId: ''
  };

  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Appel API pour charger les catégories (ou simuler ici)
    this.http.get<any[]>('http://localhost:8080/api/categories')
      .subscribe(data => this.categories = data);
  }

  submitBudget() {
    this.http.post('http://localhost:8080/api/budgets', this.budget)
      .subscribe(() => {
        alert('Budget créé avec succès');
        this.budget = { amount: 0, categoryId: '' }; // Reset
      });
  }
}
