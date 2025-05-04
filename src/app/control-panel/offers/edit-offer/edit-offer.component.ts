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
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-edit-offer',
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
    NgOptimizedImage,
  ],
  templateUrl: './edit-offer.component.html',
  styleUrl: './edit-offer.component.scss',
})
export class EditOfferComponent {
  form!: FormGroup;
  loading: boolean = false;
  categories = [];
  uploadedFiles: any[] = [];
  formData = new FormData();
  images: any = [];
  deletedImages: number[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      category_id: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    let id = this.route.snapshot.paramMap.get('id');

    this.formData.append('category_id', this.form.get('category_id')?.value);
    this.formData.append('title', this.form.get('title')?.value);
    this.formData.append('deleted_images', JSON.stringify(this.deletedImages));

    this.apiService.store(`offers/${id}`, this.formData).subscribe({
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

  deleteImage(id: number) {
    this.deletedImages.push(id);
    let filteredImages = this.images.filter((img: any) => img.id != id);
    this.images = filteredImages;
  }

  ngOnInit(): void {
    this.apiService.index('categories').subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
    });

    let id = this.route.snapshot.paramMap.get('id');

    this.apiService.index(`offers/${id}`).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          title: res.data.title,
          category_id: res.data.category_id,
        });
        this.images = res.data.images;
      },
    });
  }
}
