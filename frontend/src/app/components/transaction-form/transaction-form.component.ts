import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent implements OnInit {
  form!: FormGroup;
  id!: number | null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private service: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      amount: [0, Validators.required],
      date: ['', Validators.required],
      type: ['income', Validators.required],
      category: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.service.getById(this.id).subscribe(data => this.form.patchValue(data));
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.service.update(this.id!, this.form.value).subscribe(() => this.router.navigate(['/transactions']));
    } else {
      this.service.create(this.form.value).subscribe(() => this.router.navigate(['/transactions']));
    }
  }
}
