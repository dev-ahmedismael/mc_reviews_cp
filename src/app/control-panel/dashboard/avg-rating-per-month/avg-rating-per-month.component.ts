import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-avg-rating-per-month',
  imports: [NgApexchartsModule],
  templateUrl: './avg-rating-per-month.component.html',
  styleUrls: ['./avg-rating-per-month.component.scss'],
})
export class AvgRatingPerMonthComponent implements OnInit {
  @Input() ratingPerMonth: any = [];

  monthlyRatingChart = {
    chart: {
      type: 'area' as ChartType,
      height: 350,
    },
    series: [
      {
        name: 'التقييم المتوسط الشهري',
        data: [] as number[], // Explicitly typing as number array
      },
    ],
    xaxis: {
      categories: [] as string[], // Explicitly typing as string array
    },
    yaxis: {
      min: 0,
      max: 4,
      tickAmount: 4,
    },
  };

  ngOnInit(): void {
    const monthNames: string[] = [
      'يناير',
      'فبراير',
      'مارس',
      'ابريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ];

    // Initialize months array with 0 ratings
    let months: number[] = new Array(12).fill(0); // Type as number array

    // Assign ratings to corresponding months
    this.ratingPerMonth.forEach((m: any) => {
      months[m.month - 1] = m.avg_rating; // Map month to its avg_rating
    });

    // Now, all months will appear, even if they have no data
    this.monthlyRatingChart.xaxis.categories = monthNames;
    this.monthlyRatingChart.series[0].data = months;
  }
}
