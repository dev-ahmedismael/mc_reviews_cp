import { Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'لوحة التحكم',
    component: ControlPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      // Dashboard
      {
        path: 'dashboard',
        title: 'لوحة البيانات',
        loadComponent: () =>
          import('./control-panel/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      // Branches
      {
        path: 'branches',
        title: 'الفروع',

        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./control-panel/branches/branches.component').then(
                (m) => m.BranchesComponent
              ),
          },
          {
            path: 'create-new-branch',
            title: 'إضافة فرع جديد',
            loadComponent: () =>
              import(
                './control-panel/branches/create-new-branch/create-new-branch.component'
              ).then((m) => m.CreateNewBranchComponent),
          },
          {
            path: 'edit/:id',
            title: 'تعديل الفرع',
            loadComponent: () =>
              import(
                './control-panel/branches/edit-branch/edit-branch.component'
              ).then((m) => m.EditBranchComponent),
          },
        ],
      },
      // News
      {
        path: 'news',
        title: 'الأخبار',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./control-panel/news/news.component').then(
                (m) => m.NewsComponent
              ),
          },
          {
            path: 'create-new-news',
            title: 'إضافة خبر جديد',
            loadComponent: () =>
              import(
                './control-panel/news/create-new-news/create-new-news.component'
              ).then((m) => m.CreateNewNewsComponent),
          },
          {
            path: 'edit/:id',
            title: 'تعديل الخبر',
            loadComponent: () =>
              import('./control-panel/news/edit-news/edit-news.component').then(
                (m) => m.EditNewsComponent
              ),
          },
        ],
      },
      // Categories
      {
        path: 'categories',
        title: 'الأقسام الطبية',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./control-panel/categories/categories.component').then(
                (m) => m.CategoriesComponent
              ),
          },
          {
            path: 'create-new-category',
            title: 'إضافة قسم جديد',
            loadComponent: () =>
              import(
                './control-panel/categories/create-new-category/create-new-category.component'
              ).then((m) => m.CreateNewCategoryComponent),
          },
          {
            path: 'edit/:id',
            title: 'تعديل القسم',
            loadComponent: () =>
              import(
                './control-panel/categories/edit-category/edit-category.component'
              ).then((m) => m.EditCategoryComponent),
          },
        ],
      },
      // Offers
      {
        path: 'offers',
        title: 'العروض',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./control-panel/offers/offers.component').then(
                (m) => m.OffersComponent
              ),
          },
          {
            path: 'create-new-offer',
            title: 'إضافة عرض جديد',
            loadComponent: () =>
              import(
                './control-panel/offers/create-new-offer/create-new-offer.component'
              ).then((m) => m.CreateNewOfferComponent),
          },
          {
            path: 'edit/:id',
            title: 'تعديل العرض',
            loadComponent: () =>
              import(
                './control-panel/offers/edit-offer/edit-offer.component'
              ).then((m) => m.EditOfferComponent),
          },
        ],
      },
      // Employees
      {
        path: 'employees',
        title: 'الموظفين',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./control-panel/employees/employees.component').then(
                (m) => m.EmployeesComponent
              ),
          },
          {
            path: 'create-new-employee',
            title: 'إضافة موظف جديد',
            loadComponent: () =>
              import(
                './control-panel/employees/create-new-employee/create-new-employee.component'
              ).then((m) => m.CreateNewEmployeeComponent),
          },
          {
            path: 'edit/:id',
            title: 'تعديل الموظف',
            loadComponent: () =>
              import(
                './control-panel/employees/edit-employee/edit-employee.component'
              ).then((m) => m.EditEmployeeComponent),
          },
        ],
      },
      // Supervisors
      {
        path: 'supervisors',
        title: 'المشرفين',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./control-panel/supervisors/supervisors.component').then(
                (m) => m.SupervisorsComponent
              ),
          },
          {
            path: 'create-new-supervisor',
            title: 'إضافة مشرف جديد',
            loadComponent: () =>
              import(
                './control-panel/supervisors/create-new-supervisor/create-new-supervisor.component'
              ).then((m) => m.CreateNewSupervisorComponent),
          },
          {
            path: 'edit/:id',
            title: 'تعديل المشرف',
            loadComponent: () =>
              import(
                './control-panel/supervisors/edit-supervisor/edit-supervisor.component'
              ).then((m) => m.EditSupervisorComponent),
          },
        ],
      },
      // Edit Profile
      {
        path: 'edit-profile',
        title: 'تعديل بيانات الملف الشخصي',
        loadComponent: () =>
          import('./control-panel/edit-profile/edit-profile.component').then(
            (m) => m.EditProfileComponent
          ),
      },
    ],
  },

  // Authentication
  {
    path: 'authentication',
    loadComponent: () =>
      import('./authentication/authentication.component').then(
        (m) => m.AuthenticationComponent
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        title: 'تسجيل الدخول',
        loadComponent: () =>
          import('./authentication/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
];
