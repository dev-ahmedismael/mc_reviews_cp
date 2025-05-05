import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-daily-per-employee',
  imports: [NgApexchartsModule],
  templateUrl: './daily-per-employee.component.html',
  styleUrl: './daily-per-employee.component.scss',
})
export class DailyPerEmployeeComponent {
  @Input() dailyPerEmployee: any = [];
}
