import { Component } from '@angular/core';
import {
  Col,
  CreateButton,
  TableComponent,
} from '../../../components/table/table.component';

@Component({
  selector: 'app-news',
  imports: [TableComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  cols: Col[] = [
    {
      key: 'post',
      header: 'الخبر',
    },
  ];

  createButton: CreateButton = {
    label: 'إضافة خبر جديد',
    route: 'create-new-news',
  };
}
