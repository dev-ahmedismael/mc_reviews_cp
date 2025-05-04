import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-offers',
  imports: [TableComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent {
  cols: Col[] = [
    { key: 'category_id', header: 'القسم الطبي' },
    { key: 'title', header: 'اسم العرض' },
  ];
  createButton: CreateButton = {
    label: 'إضافة عرض جديد',
    route: 'create-new-offer',
  };
}
