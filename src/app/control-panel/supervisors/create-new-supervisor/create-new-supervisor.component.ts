import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../../components/heading/heading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-new-supervisor',
  imports: [
    HeadingComponent,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabel,
    ButtonModule,
    SelectModule,
    InputTextModule,
  ],
  templateUrl: './create-new-supervisor.component.html',
  styleUrl: './create-new-supervisor.component.scss',
})
export class CreateNewSupervisorComponent {
  form!: FormGroup;
  loading: boolean = false;
  roles = [
    { label: 'مدير', value: 'admin' },
    { label: 'مشرف', value: 'supervisor' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this.apiService.store('users', this.form.value).subscribe({
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

  ngOnInit(): void {}
}
