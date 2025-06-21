import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-employees',
  imports: [TableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  cols: Col[] = [
    { key: 'branch', header: 'الفرع' },
    { key: 'name', header: 'اسم الموظف' },
    { key: 'code', header: 'كود الموظف' },
    { key: 'is_active', header: 'الحالة' },
  ];

  createButton: CreateButton = {
    label: 'إضافة موظف جديد',
    route: 'create-new-employee',
  };
}
