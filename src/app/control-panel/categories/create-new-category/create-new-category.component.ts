import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
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

@Component({
  selector: 'app-create-new-category',
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    HeadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-new-category.component.html',
  styleUrl: './create-new-category.component.scss',
})
export class CreateNewCategoryComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    this.apiService.store('categories', this.form.value).subscribe({
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
}
