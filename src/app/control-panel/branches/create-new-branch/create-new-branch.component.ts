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
  selector: 'app-create-new-branch',
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    HeadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-new-branch.component.html',
  styleUrl: './create-new-branch.component.scss',
})
export class CreateNewBranchComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      domain: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.apiService.store('branches', this.form.value).subscribe({
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
