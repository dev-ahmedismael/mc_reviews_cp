import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-branches',
  imports: [TableComponent],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss',
})
export class BranchesComponent {
  cols: Col[] = [
    {
      key: 'name',
      header: 'اسم الفرع',
    },
    {
      key: 'domain',
      header: 'رابط الفرع',
    },
  ];

  createButton: CreateButton = {
    label: 'إضافة فرع جديد',
    route: 'create-new-branch',
  };
}
