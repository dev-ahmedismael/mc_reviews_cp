import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-categories',
  imports: [TableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  cols: Col[] = [{ header: 'الاسم', key: 'title' }];

  createButton: CreateButton = {
    label: 'إضافة قسم جديد',
    route: 'create-new-category',
  };
}
