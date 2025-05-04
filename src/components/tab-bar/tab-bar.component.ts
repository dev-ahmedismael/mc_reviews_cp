import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { TabsModule } from 'primeng/tabs';

interface TabItem {
  icon?: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule, TabsModule, RouterLink, CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent implements OnInit {
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
