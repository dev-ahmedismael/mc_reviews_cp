import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  Organization,
  User,
  UserOrganizationsResponse,
} from '../../types/organization.types';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { HttpErrorResponse } from '@angular/common/http';

interface ModulesMenuItem {
  id: number;
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    AvatarModule,
    ButtonModule,
    Menu,
    ToastModule,
    MegaMenuModule,
    CommonModule,
    CardModule,
    NgOptimizedImage,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  userMenuItems: MenuItem[] | undefined = undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.apiService.index<User>('authenticated-user').subscribe({
      next: (res) => {
        this.user = res;
      },
    });
    this.userMenuItems = [
      {
        label: 'تعديل الملف الشخصي',
        icon: 'pi pi-user-edit',
        routerLink: '/edit-profile',
      },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    this.apiService.index('logout').subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/authentication/login');
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error.message,
        });
      },
    });
  }
}
