import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-avg-rating-per-branch',
  imports: [NgApexchartsModule],
  templateUrl: './avg-rating-per-branch.component.html',
  styleUrl: './avg-rating-per-branch.component.scss',
})
export class AvgRatingPerBranchComponent implements OnInit {
  @Input() ratingPerBranch: any = [];

  ratingPerBranchChart = {
    chart: {
      type: 'bar' as ChartType,
      height: 350,
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
    labels: {
      formatter: (val: number) => val.toFixed(1),
    },
  };

  ngOnInit(): void {
    console.log(this.ratingPerBranch);

    this.ratingPerBranchChart.series[0].data = this.ratingPerBranch.map(
      (b: any) => parseFloat(b.avg_rating).toFixed(2)
    );
    this.ratingPerBranchChart.xaxis.categories = this.ratingPerBranch.map(
      (b: any) => b.branch
    );
  }
}
