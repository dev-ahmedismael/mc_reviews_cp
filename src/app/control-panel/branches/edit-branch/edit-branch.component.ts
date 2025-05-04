import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../../components/heading/heading.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../../services/api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-branch',
  imports: [
    HeadingComponent,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.scss',
  standalone: true,
})
export class EditBranchComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      domain: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.apiService.update('branches', this.id, this.form.value).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.messageService.add({ severity: 'success', summary: res.message });
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: err.error.message,
        });
      },
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id?.toString() || '';
    this.apiService.index(`branches/${id}`).subscribe({
      next: (res: any) => {
        this.form.patchValue(res.data);
      },
    });
  }
}
