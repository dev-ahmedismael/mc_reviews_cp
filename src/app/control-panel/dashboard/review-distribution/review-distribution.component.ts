import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-review-distribution',
  imports: [NgApexchartsModule],
  templateUrl: './review-distribution.component.html',
  styleUrl: './review-distribution.component.scss',
})
export class ReviewDistributionComponent implements OnChanges {
  @Input() reviewDistribution: any = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviewDistribution'] && this.reviewDistribution?.length) {
      this.reviewDistributionChart.labels = this.reviewDistribution.map(
        (item: any) => item.label
      );
      this.reviewDistributionChart.series = this.reviewDistribution.map(
        (item: any) => item.percentage
      );
    }
  }
}
