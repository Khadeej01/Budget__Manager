

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './transaction-form.component.html',

})
export class TransactionFormComponent implements OnInit {
  form!: FormGroup;
  id!: number | null;
  isEdit = false;

  categories = ['Food', 'Other', 'Leisure', 'Clothing', 'Education', 'Healthcare'];

  constructor(
    private fb: FormBuilder,
    private service: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      type: ['income', Validators.required],
      categorie: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.service.getById(this.id).subscribe(data => {
        const formattedDate = data.date ? data.date.split('T')[0] : '';
        this.form.patchValue({
          description: data.description,
          montant: data.montant,
          date: formattedDate,
          type: data.type,
          categorie: data.categorie
        });
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;

    if (this.isEdit) {
      this.service.update(this.id!, payload).subscribe(() => {
        this.router.navigate(['/transaction-list']);
      }, error => {
        console.error('Erreur lors de la mise à jour', error);
      });
    } else {
      this.service.create(payload).subscribe(() => {
        this.router.navigate(['/transaction-list']);
      }, error => {
        console.error('Erreur lors de la création', error);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/transaction-list']);
  }
}
