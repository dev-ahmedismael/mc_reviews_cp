import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from '../../../services/api.service';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  reviewDistribution: any = [];
  averageRating: any = [];
  ratingPerBranch: any = [];
  ratingPerMonth: any = [];

  reviewDistributionChart = {
    chart: {
      type: 'pie' as ChartType,
    },
    labels: [], // Filled dynamically
    series: [], // Filled dynamically
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  ratingPerBranchChart = {
    chart: {
      type: 'bar' as ChartType,
    },
    series: [
      {
        name: 'Average Rating',
        data: [], // Filled dynamically
      },
    ],
    xaxis: {
      categories: [], // Filled dynamically
    },
    yaxis: {
      min: 0,
      max: 4,
      tickAmount: 4,
    },
  };

  monthlyRatingChart = {
    chart: {
      type: 'line' as ChartType,
    },
    series: [
      {
        name: 'Monthly Average Rating',
        data: [], // Filled dynamically
      },
    ],
    xaxis: {
      categories: [], // Filled dynamically (month names)
    },
    yaxis: {
      min: 0,
      max: 4,
      tickAmount: 4,
    },
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.index('stats').subscribe({
      next: (res: any) => {
        this.reviewDistribution = res.reviewDistribution;
        this.averageRating = res.averageRating;
        this.ratingPerBranch = res.ratingPerBranch;
        this.ratingPerMonth = res.ratingPerMonth;

        this.reviewDistributionChart.labels = res.reviewDistribution.map(
          (item: any) => item.label
        );
        this.reviewDistributionChart.series = res.reviewDistribution.map(
          (item: any) => item.percentage
        );

        this.ratingPerBranchChart.series[0].data = res.ratingPerBranch.map(
          (b: any) => b.avg_rating
        );
        this.ratingPerBranchChart.xaxis.categories = res.ratingPerBranch.map(
          (b: any) => b.branch
        );

        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        const months = res.ratingPerMonth.map(
          (m: any) => monthNames[m.month - 1]
        );
        const ratings = res.ratingPerMonth.map((m: any) => m.avg_rating);

        this.monthlyRatingChart.xaxis.categories = months;
        this.monthlyRatingChart.series[0].data = ratings;
      },
    });
  }
}
