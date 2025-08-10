import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ApiService } from '../../../services/api.service';
import { LoginRequest, LoginResponse } from '../../../types/auth.types';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CookieService } from '../../../services/cookie.service';
import { Toast } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    ReactiveFormsModule,
    Toast,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.apiService
      .store<LoginRequest, LoginResponse>('login', this.form.value)
      .subscribe({
        next: (res: LoginResponse) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', res.token);
          }
          this.router.navigateByUrl(`/`);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ في تسجيل الدخول',
            detail: err.error.message || 'حدث خطأ غير متوقع',
          });
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
