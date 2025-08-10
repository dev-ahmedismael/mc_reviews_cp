import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-positions',
  imports: [TableComponent],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss',
})
export class PositionsComponent {
  cols: Col[] = [{ key: 'name', header: 'اسم الوظيفة' }];
  createButton: CreateButton = {
    label: 'إضافة وظيفة جديدة',
    route: 'create-new-position',
  };
}
