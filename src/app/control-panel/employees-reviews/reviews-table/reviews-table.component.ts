import { Component, OnInit } from '@angular/core';
import {
  Col,
  TableComponent,
} from '../../../../components/table/table.component';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reviews-table',
  imports: [TableComponent, ButtonModule],
  templateUrl: './reviews-table.component.html',
  styleUrl: './reviews-table.component.scss',
})
export class ReviewsTableComponent implements OnInit {
  path: any = null;

  apiUrl = environment.api.base;

  cols: Col[] = [
    { header: 'الفرع', key: 'branch_name' },
    { header: 'الموظف', key: 'employee_name' },
    { header: 'التقييم', key: 'value' },
    { header: 'التعليق', key: 'notes' },
    { header: 'التاريخ', key: 'created_at' },
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  download() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.http
        .get(`${this.apiUrl}/reviews/export/position/${id}`, {
          responseType: 'blob', // <--- important
        })
        .subscribe((data: Blob) => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reviews_position_${id}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.path = `reviews/position/${id}`;
    });
  }
}
