import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { TabBarComponent } from '../../../components/tab-bar/tab-bar.component';

@Component({
  selector: 'app-employees-reviews',
  imports: [TabBarComponent, RouterOutlet],
  templateUrl: './employees-reviews.component.html',
  styleUrl: './employees-reviews.component.scss',
})
export class EmployeesReviewsComponent implements OnInit {
  tabs: any = null;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService.index('positions/all').subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.data.length > 0) {
          let data = res.data.map((e: any) => {
            return { label: e.name, route: e.id };
          });

          this.tabs = data;

          this.router.navigateByUrl(`/employee-reviews/${data[0].route}`);
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
