import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  form!: FormGroup;
  id: number | null = null;
  isEdit = false;

  categories = ['Food', 'Other', 'Leisure', 'Clothing', 'Education', 'Healthcare'];

  constructor(
    private fb: FormBuilder,
    private service: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      type: ['income', Validators.required],
      categorie: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      if (!isNaN(this.id)) {
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
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Merci de remplir correctement tous les champs requis.');
      return;
    }

    const payload = this.form.value;

    if (this.isEdit && this.id !== null) {
      this.service.update(this.id, payload).subscribe({
        next: () => {
          alert('Transaction mise à jour avec succès !');
          this.router.navigate(['/transaction-list']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
          alert('Erreur lors de la mise à jour.');
        }
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => {
          alert('Transaction créée avec succès !');
          this.router.navigate(['/transaction-list']);
        },
        error: (error) => {
          console.error('Erreur lors de la création', error);
          alert('Erreur lors de la création : ' + (error.message || error.statusText || 'Erreur inconnue'));
        }
      });

    }
  }

  onCancel(): void {
    this.router.navigate(['/transaction-list']);
  }
}
