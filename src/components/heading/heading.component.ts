import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-heading',
  imports: [ButtonModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss',
})
export class HeadingComponent {
  @Input() title: string = '';
  @Input() path: string = '';

  constructor(private router: Router) {}

  redirectBack() {
    this.router.navigateByUrl(this.path);
  }
}
