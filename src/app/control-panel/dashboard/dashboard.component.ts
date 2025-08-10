import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from '../../../services/api.service';
import { ReviewDistributionComponent } from './review-distribution/review-distribution.component';
import { DailyReviewsByBranchComponent } from './daily-reviews-by-branch/daily-reviews-by-branch.component';
import { DailyPerEmployeeComponent } from './daily-per-employee/daily-per-employee.component';
import { AvgRatingPerBranchComponent } from './avg-rating-per-branch/avg-rating-per-branch.component';
import { AvgRatingPerMonthComponent } from './avg-rating-per-month/avg-rating-per-month.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgApexchartsModule,
    ReviewDistributionComponent,
    DailyReviewsByBranchComponent,
    DailyPerEmployeeComponent,
    AvgRatingPerBranchComponent,
    AvgRatingPerMonthComponent,
    EmployeeDataComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  reviewDistribution: any = [];
  ratingPerBranch: any = [];
  ratingPerMonth: any = [];
  dailyPerBranch: any = [];
  dailyPerEmployee: any = [];

  constructor(private apiService: ApiService) {}

  getLabel(value: number): string {
    const labels: Record<number, string> = {
      1: 'غير راضي',
      2: 'محايد',
      3: 'راضي',
      4: 'راضي جداً',
    };
    return labels[value] || `Rating ${value}`;
  }

  ngOnInit(): void {
    this.apiService.index('stats').subscribe({
      next: (res: any) => {
        this.loading = false;
        this.reviewDistribution = res.reviewDistribution;
        this.ratingPerBranch = res.ratingPerBranch;
        this.ratingPerMonth = res.ratingPerMonth;

        const dailyData = res.dailyReviewPerBranch;

        const branches = dailyData.map((item: any) => item.branch);

        const getDataByValue = (value: number) =>
          dailyData.map((item: any) => item[value] || 0);

        this.dailyPerBranch = {
          chart: {
            type: 'area',
            stacked: true,
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: branches,
          },
          series: [
            {
              name: 'راضي جداً',
              data: getDataByValue(4),
            },
            {
              name: 'راضي',
              data: getDataByValue(3),
            },
            {
              name: 'محايد',
              data: getDataByValue(2),
            },
            {
              name: 'غير راضي',
              data: getDataByValue(1),
            },
          ],
          legend: {
            position: 'bottom',
          },
          colors: ['#00c853', '#ffd600', '#ff9100', '#d50000'],
          dataLabels: {
            enabled: true,
          },
        };

        // Daily per employee

        const employees = res.dailyReviewPerEmployee;

        const categories = employees.map((emp: any) => emp.employee);

        const series = [1, 2, 3, 4].map((value) => ({
          name: this.getLabel(value),
          data: employees.map((emp: any) => emp[value] || 0),
        }));

        this.dailyPerEmployee = {
          series,
          chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories,
            labels: {
              style: {
                fontFamily: 'Arial',
                fontSize: '14px',
              },
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'center',
          },
          colors: ['#00c853', '#ffd600', '#ff9100', '#d50000'].reverse(),
          tooltip: {
            y: {
              formatter: (val: any) => `${val} تقييم`,
            },
          },
        };
      },
    });
  }
}
