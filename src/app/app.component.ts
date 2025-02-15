import { Component } from '@angular/core';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
import { NavLayoutComponent } from './core/layout/nav-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavLayoutComponent, LoadingOverlayComponent],
  template: `
    <app-nav-layout></app-nav-layout>
    <app-loading-overlay></app-loading-overlay>
  `,
})
export class AppComponent {}
