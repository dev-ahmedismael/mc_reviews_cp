import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-supervisors',
  imports: [TableComponent],
  templateUrl: './supervisors.component.html',
  styleUrl: './supervisors.component.scss',
})
export class SupervisorsComponent {
  cols: Col[] = [
    { key: 'name', header: 'اسم المشرف' },
    { key: 'email', header: 'البريد الإلكتروني' },
    { key: 'role', header: 'الرتبة' },
  ];

  createButton: CreateButton = {
    label: 'إضافة مشرف جديد',
    route: 'create-new-supervisor',
  };
}
