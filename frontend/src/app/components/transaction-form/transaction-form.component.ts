import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class TransactionFormComponent implements OnInit {
  form!: FormGroup;
  id!: number | null;
  isEdit = false;

  // قائمة التصنيفات
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
      montant: [0, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      type: ['income', Validators.required],
      categorie: ['', Validators.required]  // الاسم ثابت هنا
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.service.getById(this.id).subscribe(data => {
        this.form.patchValue({
          description: data.description,
          montant: data.montant,
          date: data.date.split('T')[0], // حذف الوقت من التاريخ
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
      });
    } else {
      this.service.create(payload).subscribe(() => {
        this.router.navigate(['/transaction-list']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/transaction-list']);
  }
}
