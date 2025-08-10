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
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  imports: [
    HeadingComponent,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabel,
    ButtonModule,
    SelectModule,
    InputTextModule,
    CheckboxModule,
    CommonModule,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  branches = [];
  positions = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      branch_id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      is_active: [false],
      position_id: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    let id = this.route.snapshot.paramMap.get('id') || '';

    this.apiService.update('employees', id, this.form.value).subscribe({
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
    this.apiService.index('branches').subscribe({
      next: (res: any) => {
        this.branches = res.data;
      },
    });

    this.apiService.index('positions/all').subscribe({
      next: (res: any) => {
        this.positions = res.data;
      },
    });

    let id = this.route.snapshot.paramMap.get('id');
    this.apiService.index(`employees/${id}`).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          ...res.data,
          is_active: res.data.is_active === 1 || res.data.is_active === true,
        });
      },
    });
  }
}
