import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDTO } from '../../models/transaction.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  transactions: TransactionDTO[] = [];
  filterForm!: FormGroup;

  constructor(private service: TransactionService, private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      categorie: [''],
      type: [''],
      startDate: [''],
      endDate: ['']
    });

    this.loadTransactions();
  }

  loadTransactions(filters?: any) {
    this.service.getAll(filters).subscribe(data => {
      this.transactions = data;
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.loadTransactions(filters);
  }

  resetFilters() {
    this.filterForm.reset();
    this.loadTransactions();
  }

  onDelete(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette transaction ?")) {
      this.service.delete(id).subscribe(() => {
        this.loadTransactions();
      });
    }
  }
}
