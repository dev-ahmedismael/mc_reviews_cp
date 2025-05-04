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
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create-new-offer',
  imports: [
    HeadingComponent,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabel,
    ButtonModule,
    SelectModule,
    InputTextModule,
    FileUpload,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './create-new-offer.component.html',
  styleUrl: './create-new-offer.component.scss',
})
export class CreateNewOfferComponent {
  form!: FormGroup;
  loading: boolean = false;
  categories = [];
  uploadedFiles: any[] = [];
  formData = new FormData();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      category_id: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    this.formData.append('category_id', this.form.get('category_id')?.value);
    this.formData.append('title', this.form.get('title')?.value);

    this.apiService.store('offers', this.formData).subscribe({
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

  onUpload(event: FileSelectEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.formData.append('images[]', file);
    }
  }

  ngOnInit(): void {
    this.apiService.index('categories').subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
    });
  }
}
