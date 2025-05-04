import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-authentication',
  imports: [RouterOutlet, CardModule, NgOptimizedImage],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {}
