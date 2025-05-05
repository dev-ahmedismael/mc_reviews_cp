import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-data',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    DatePickerModule,
    CommonModule,
  ],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.scss',
})
export class EmployeeDataComponent implements OnInit {
  employees: any[] = [];
  form!: FormGroup;
  loading: boolean = false;
  employee: any = undefined;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      employee_id: [''],
      start_date: [''],
      end_date: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    this.employee = undefined;
    this.apiService.store('employees/filter', this.form.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;

        this.employee = {
          ratings: res.ratings,
          notes: res.notes,
        };
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  ngOnInit(): void {
    this.apiService.index('employees/all').subscribe({
      next: (res: any) => {
        this.employees = res.data;
      },
    });
  }
}
