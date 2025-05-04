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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-supervisor',
  imports: [
    HeadingComponent,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabel,
    ButtonModule,
    SelectModule,
    InputTextModule,
  ],
  templateUrl: './edit-supervisor.component.html',
  styleUrl: './edit-supervisor.component.scss',
})
export class EditSupervisorComponent {
  form!: FormGroup;
  loading: boolean = false;
  roles = [
    { label: 'مدير', value: 'admin' },
    { label: 'مشرف', value: 'supervisor' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      role: [''],
    });
  }

  onSubmit() {
    this.loading = true;

    let id = this.route.snapshot.paramMap.get('id') || '';

    this.apiService.update(`users`, id, this.form.value).subscribe({
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

    this.apiService.index(`users/${id}`).subscribe({
      next: (res: any) => {
        this.form.patchValue(res.data);
      },
    });
  }
}
