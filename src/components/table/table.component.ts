import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

export interface Col {
  key: string;
  header: string;
  type?: string;
}

export interface CreateButton {
  label: string;
  route: string;
}

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    SkeletonModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink,
    PaginatorModule,
    ConfirmPopupModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() cols: Col[] | undefined = undefined;
  rows: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() path: string = '';
  @Input() createButton: CreateButton | undefined = undefined;
  loading: boolean = true;
  filteredResults: boolean = false;
  searchForm!: FormGroup;
  totalRecords: number = 0;
  first: number = 0;
  pRows: number = 10;
  currentPage: number = 1;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  onSearch() {
    this.loading = true;
    this.getData();
    this.filteredResults = true;
  }

  resetData() {
    this.loading = true;
    this.searchForm.patchValue({ search: '' });
    this.getData();
    this.filteredResults = false;
  }

  getData(per_page: number = 10, page: string | number = '') {
    let search = this.filteredResults
      ? this.searchForm.get('search')?.value
      : '';

    this.apiService.index(this.path, per_page, search, page).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.rows = res.data;
        this.totalRecords = res.total;
        this.pRows = res.per_page;
      },
      error: (err: HttpErrorResponse) => {
        if (typeof window !== 'undefined') {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ في الإتصال',
            detail: err.error.message,
          });
        }
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.loading = true;
    this.first = event.first || 0;
    this.currentPage = event.page || 0 + 1;
    this.getData(event.rows, event.page || 0 + 1);
  }

  onDeleteConfirm(id: string, event: MouseEvent) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'تأكيد',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      rejectLabel: 'إلغاء',
      rejectButtonProps: {
        outlined: true,
      },
      accept: () => this.delete(id),
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'تم الإلغاء' });
      },
    });
  }

  delete(id: string) {
    this.apiService.destroy(this.path, id).subscribe({
      next: (res: any) => {
        let search = this.filteredResults
          ? this.searchForm.get('search')?.value
          : '';

        this.messageService.add({
          severity: 'success',
          summary: res.message,
        });

        this.apiService
          .index(this.path, this.pRows, search, this.currentPage)
          .subscribe((res: any) => {
            if (res.data.length === 0 && this.currentPage > 1) {
              this.currentPage--;
              this.apiService
                .index(this.path, this.pRows, search, this.currentPage)
                .subscribe((prevRes: any) => {
                  this.rows = prevRes.data;
                  this.totalRecords = prevRes.total;
                });
            } else {
              this.rows = res.data;
              this.totalRecords = res.total;
            }
          });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error.message,
        });
      },
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.getData();
  }
}
