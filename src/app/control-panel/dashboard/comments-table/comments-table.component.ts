import { Component } from '@angular/core';
import {
  Col,
  TableComponent,
} from '../../../../components/table/table.component';

@Component({
  selector: 'app-comments-table',
  imports: [TableComponent],
  templateUrl: './comments-table.component.html',
  styleUrl: './comments-table.component.scss',
})
export class CommentsTableComponent {
  cols: Col[] = [
    { header: 'الفرع', key: 'branch_name' },
    { header: 'الموظف', key: 'employee_name' },
    { header: 'التقييم', key: 'value' },
    { header: 'التعليق', key: 'notes' },
    { header: 'التاريخ', key: 'created_at' },
  ];
}
