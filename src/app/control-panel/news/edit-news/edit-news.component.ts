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

@Component({
  selector: 'app-edit-news',
  imports: [
    HeadingComponent,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabel,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.scss',
})
export class EditNewsComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  branches = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      branch_id: ['', Validators.required],
      post: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    let id = this.route.snapshot.paramMap.get('id') || '';

    this.apiService.update('posts', id, this.form.value).subscribe({
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

    let id = this.route.snapshot.paramMap.get('id');
    this.apiService.index(`posts/${id}`).subscribe({
      next: (res: any) => {
        this.form.patchValue(res.data);
      },
    });
  }
}
