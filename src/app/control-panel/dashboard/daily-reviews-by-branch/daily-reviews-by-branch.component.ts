import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-daily-reviews-by-branch',
  imports: [NgApexchartsModule],
  templateUrl: './daily-reviews-by-branch.component.html',
  styleUrl: './daily-reviews-by-branch.component.scss',
})
export class DailyReviewsByBranchComponent implements OnChanges {
  @Input() dailyPerBranch: any = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dailyPerBranch'] && this.dailyPerBranch?.length) {
    }
  }
}
