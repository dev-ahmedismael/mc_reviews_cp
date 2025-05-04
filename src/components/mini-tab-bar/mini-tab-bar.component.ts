import { Component, Input, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { TabsModule } from 'primeng/tabs';

interface TabItem {
  icon?: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-mini-tab-bar',
  standalone: true,
  imports: [CommonModule, TabsModule, RouterLink, CommonModule, RouterOutlet],
  templateUrl: './mini-tab-bar.component.html',
  styleUrl: './mini-tab-bar.component.scss',
})
export class MiniTabBarComponent implements OnInit {
  @Input() tabs: TabItem[] = [];
  @Input() category: string | null = null;

  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateActiveTab(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateActiveTab(event.urlAfterRedirects || event.url);
      });
  }

  private updateActiveTab(url: string) {
    const matchingTab = this.tabs.find((tab) => url.includes(tab.route));
    this.currentRoute = matchingTab ? matchingTab.route : '';
  }
}
