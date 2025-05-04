import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { passwordConfirmValidator } from '../../../utilities/validators';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  imports: [
    HeadingComponent,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required, Validators.email],
    });

    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required, passwordConfirmValidator]],
    });
  }

  onSubmit() {
    this.apiService.store('edit-profile', this.profileForm.value).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', summary: res.message });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error.message,
        });
      },
    });
  }

  onPasswordChangeSubmit() {
    this.apiService
      .store('change-password', this.passwordForm.value)
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: res.message,
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
    this.apiService.index('authenticated-user').subscribe({
      next: (res: any) => {
        this.profileForm.patchValue(res);
      },
    });
  }
}
