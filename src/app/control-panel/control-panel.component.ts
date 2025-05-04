import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { TabBarComponent } from '../../components/tab-bar/tab-bar.component';

@Component({
  selector: 'app-control-panel',
  imports: [NavbarComponent, RouterOutlet, TabBarComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {
  tabs = [
    { icon: 'pi pi-chart-line', label: 'لوحة البيانات', route: 'dashboard' },
    { icon: 'pi pi-warehouse', label: 'الفروع', route: 'branches' },
    { icon: 'pi pi-volume-up', label: 'الأخبار', route: 'news' },
    { icon: 'pi pi-sitemap', label: 'الأقسام الطبية', route: 'categories' },
    { icon: 'pi pi-tags', label: 'العروض', route: 'offers' },
    { icon: 'pi pi-address-book', label: 'الموظفين', route: 'employees' },
    { icon: 'pi pi-users', label: 'المشرفين', route: 'supervisors' },
  ];
}
